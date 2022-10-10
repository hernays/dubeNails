import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit {
  @Output('registerModal')  registerModal : EventEmitter<any> = new EventEmitter();
  @Input('dia') dia :any;

  public formGroup : FormGroup<any>;
  public lista     : string[] = ['Acrilicas', 'Esmaltado Permanente' , 'Polygel' ,
                                 'Manicura (limpieza)','kapping (revestimiento)','Relleno acrilico/polygel'];
  public success   : boolean = false;
  public error     : string = '';
  public horaDisponible : any ;
  public listaHora : number[] = [9,10,11,12,13,14,15,16,17,18];
  public modalHoras: boolean  = false;
  public horaSelecciona : number = 0;
  public modalServicios : boolean = false;
  public spinner : boolean = false;


  constructor(
    private formBuilder : FormBuilder,
    private agendaService : AgendaService,
    private eventsService : EventsService
  ){ 
    this.formGroup = this.formBuilder.group({
      nombre  : ['', [Validators.required , Validators.minLength(2)]],
      servicio: ['Seleccione un servicio...', [Validators.required]],
      hora    : ['Seleccione una hora...', [Validators.required , Validators.minLength(2)]],
      telefono: ['']
    })
  }

  ngOnInit(): void {
    this.cambiosForm();
  }

  hideModal(){
    this.registerModal.emit(false);
  }

  formatearServicio(servicio:string){
      let numberServicio = 0;
    switch(servicio){
     case 'Acrilicas': numberServicio = 3; break;
     case 'Esmaltado Permanente': numberServicio = 2; break;
     case 'Polygel': numberServicio = 3; break;
     case 'Manicura (limpieza)': numberServicio = 1; break;
     case 'kapping (revestimiento)': numberServicio = 2; break;
     case 'Relleno acrilico/polygel': numberServicio = 2; break;
    }
      return numberServicio;
  }

  async enviarDatos(){
    this.spinner = true;
    const { nombre ,  servicio , telefono }= this.formGroup.value;
    const dia = Number(this.dia.day);
    const mes = Number(this.dia.month);
    const hora = this.horaSelecciona;
    const horaServicio = this.formatearServicio(servicio);
    this.traerData( Number(hora) , nombre , servicio , dia , horaServicio ,telefono , mes)
  }

  async traerData(horaNueva:number , nombre:string , servicio:string , dia:number , horaServicio:number , telefono: any , mes:number){
    this.agendaService.getDatos().subscribe({next: (data:any) => {
               const tramos = data.map((element:any) => {
                return {hora : element.hora , tramo :element.tramo , dia : Number(element.dia) , mes : element.mes}
               })
              for(let items of tramos){
                 if(dia === items.dia && horaNueva > items.hora && horaNueva < items.tramo && mes === items.mes){  
                  this.horaDisponible = 'Hora no se encuentra Disponible.'; 
                    this.success = false; break;
                 }
                 if(dia === items.dia && horaNueva < 9 || horaNueva > 20  && mes === items.mes){
                  this.horaDisponible = 'Hora no se encuentra Disponible.'; 
                  this.success = false; break;
                }
               if(dia === items.dia && horaNueva === items.hora && mes === items.mes || horaNueva+items.tramo  === items.hora && mes === items.mes){
                this.horaDisponible = 'Hora no se encuentra Disponible.'; 
                this.success = false; break;
               }                                                  
               if(dia === items.dia && horaNueva+horaServicio > items.hora  && horaNueva+horaServicio <= items.tramo && mes === items.mes){
                this.horaDisponible = 'Hora no se encuentra Disponible.'; 
                this.success = false;break;
               }
                 this.horaDisponible = horaNueva;
              }
                 if(typeof this.horaDisponible !== typeof '' ){
                  this.agendarHora(nombre , horaNueva , servicio , dia , horaServicio , telefono , mes)
                 }
              
    },error: (error:any) => {
         if(error === 'No se encontraron registros.'){
          this.agendarHora(nombre , horaNueva , servicio , dia , horaServicio , telefono , mes)
         }
    }})
  }

  cambiosForm(){
    this.formGroup.controls['nombre'].valueChanges.subscribe( valor => {
         if(valor.length >= 1)
            this.success = false;
         
    })
    this.formGroup.controls['hora'].valueChanges.subscribe( valor => {
      if(valor.length >= 1)
           this.success = false;
      
 })

 this.formGroup.controls['servicio'].valueChanges.subscribe( valor => {
  if(valor.length >= 1)
       this.success = false;
})
  }

  mostrarHoras(){
     this.modalHoras = true;
  }

  hideModalHoras(){
    this.modalHoras = false;
  }
 
  SeleccionHora(event : any){
    const evento = event.innerText.split(':');
    this.formGroup.controls['hora'].setValue(evento[0]+':00');
    this.horaSelecciona = Number(evento[0]); 
    this.modalHoras = false;
  }

  mostrarServicios(){
   this.modalServicios = true;
  }

  hideModalServicios(){
    this.modalServicios = false;
  }

  SeleccionServicio(event : any){
    this.formGroup.controls['servicio'].setValue(event.innerText);
    this.modalServicios = false;
  }

  agendarHora(nombre:string , horaNueva:any , servicio:any , dia:number , horaServicio:any , telefono:any , mes:number){
    this.agendaService.recibirDatos({nombre , horaNueva , servicio , dia , horaServicio , telefono , mes}).subscribe({
      next : (msg:string) => {
        this.spinner = false;
        this.formGroup.controls['nombre'].setValue('');
        this.formGroup.controls['hora'].setValue('');
        this.formGroup.controls['servicio'].setValue('');
        this.formGroup.controls['telefono'].setValue('');
        this.success = true;
        this.error = '';
        this.eventsService.successDatos.emit(true);
      },
    error: (msg:string) => {
      this.error = msg;
      this.success = false;
    }
    
    }) 
  }
}
