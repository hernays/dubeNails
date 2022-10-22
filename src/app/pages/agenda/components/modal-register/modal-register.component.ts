import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
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
  public lista     : string[] = ['Acrilicas', 'Esmaltado Permanente' , 'Polygel' ,'Solo Retiro',
                                 'Manicura (limpieza)','kapping (revestimiento)','Relleno acrilico/polygel'];
  public success   : boolean = false;
  public error     : string = '';
  public horaDisponible : any ;
  public listaHora : string[] = [
    '9','9.5','10','10.5','11','11.5','12','12.5','13','13.5'
    ,'14','14.5','15','15.5','16','16.5','17','17.5','18','18.5','19','19.5'];
  public modalHoras: boolean  = false;
  public horaSelecciona : number = 0;
  public modalServicios : boolean = false;


  constructor(
    private formBuilder : FormBuilder,
    private agendaService : AgendaService,
    private eventsService : EventsService,
    private sharedService : SharedService
  ){ 
    this.formGroup = this.formBuilder.group({
      nombre  : ['' , [Validators.required , Validators.minLength(2)]],
      servicio: ['Seleccione un servicio...', [Validators.required]],
      hora    : ['Seleccione una hora...', [Validators.required , Validators.minLength(2)]],
      telefono: ['']
    })
  }

  ngOnInit(): void {
    this.cambiosForm();
    this.setDataCliente();
  }

  hideModal(){
    this.registerModal.emit(false);
  }

  formatearServicio(servicio:string){
      let numberServicio = 0;
    switch(servicio){
     case 'Acrilicas': numberServicio = 3; break;
     case 'Esmaltado Permanente': numberServicio = 1.5; break;
     case 'Polygel': numberServicio = 2.5; break;
     case 'Manicura (limpieza)': numberServicio = 1.5; break;
     case 'kapping (revestimiento)': numberServicio = 2; break;
     case 'Relleno acrilico/polygel': numberServicio = 1.5; break;
     case 'Solo Retiro': numberServicio = 1; break;
    }
      return numberServicio;
  }

  async enviarDatos(){
    
    this.formGroup.controls['nombre'].enable();
    this.formGroup.controls['telefono'].enable();
    const { nombre ,  servicio , telefono }= this.formGroup.value;
    console.log("nombre",nombre)
    const dia = Number(this.dia.day);
    const mes = Number(this.dia.month);
    console.log(this.horaSelecciona)
    const hora = Number(this.horaSelecciona);
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
    this.formGroup.controls['hora'].setValue(
      (evento[1].includes('3')) ? evento[0]+':30' :
      evento[0]+':00'
      );
    this.horaSelecciona = (evento[1].includes('3')) ? Number(evento[0]+'.5') : Number(evento[0]); 
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

  agendarHora(nombre:string , horaNueva:any , servicio:string , dia:number , horaServicio:any , telefono:any , mes:number){
    if(!this.lista.includes(servicio)){
        this.horaDisponible = 'El servicio es obligatorio';
        this.success = false;
        return
          }

    this.agendaService.recibirDatos({nombre , horaNueva , servicio , dia , horaServicio , telefono , mes}).subscribe({
      next : (msg:string) => {
        this.formGroup.controls['nombre'].setValue('');
        this.formGroup.controls['hora'].setValue('');
        this.formGroup.controls['servicio'].setValue('');
        this.formGroup.controls['telefono'].setValue('');
        this.success = true;
        this.error = '';
        this.eventsService.alertMessage('success','Registrado con Exito')
        this.eventsService.successDatos.emit(true);
        this.setDataCliente();
      },
    error: (msg:string) => {
      this.error = msg;
      this.success = false;
      this.eventsService.alertMessage('error',msg)
    }
    
    }) 
  }


  setDataCliente(){
    this.sharedService.getRolUser().subscribe(data=>{
      if(data?.nombre){
        this.formGroup.controls['nombre'].disable();
         this.formGroup.controls['nombre'].setValue(data.nombre);
         if(data?.telefono){
           this.formGroup.controls['telefono'].disable();
          this.formGroup.controls['telefono'].setValue(data.telefono);
         }
      }
    })
  }
}
