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
  public lista     : string[] = ['Acrilicas' , 'Permanente' , 'Poligel'];
  public success   : string = '';
  public error     : string = '';
  public horaDisponible : any ;


  constructor(
    private formBuilder : FormBuilder,
    private agendaService : AgendaService,
    private eventsService : EventsService
  ){ 
    this.formGroup = this.formBuilder.group({
      nombre  : ['', [Validators.required , Validators.minLength(2)]],
      servicio: ['', [Validators.required]],
      hora    : ['', [Validators.required , Validators.minLength(2)]]
    })
  }

  ngOnInit(): void {
    this.cambiosForm();
   
  }

  hideModal(){
    this.registerModal.emit(false);
  }

  async enviarDatos(){
    const { nombre , hora , servicio }= this.formGroup.value;
    const dia = Number(this.dia);
    const horaServicio = (servicio === 'Permanente') ? 2 : 3;
    this.traerData(Number(hora) , nombre , servicio , dia , horaServicio )
  }

  async traerData(horaNueva:number , nombre:string , servicio:string , dia:number , horaServicio:number){
    this.agendaService.getDatos().subscribe({next: (data:any) => {
      console.log(data)
               const tramos = data.agenda.map((element:any) => {
                return {hora : element.hora , tramo :element.tramo , dia : Number(element.dia)}
               })
              for(let items of tramos){
                              console.log("dia: ", dia, 'items.dia: ', items.dia)
                 if(dia === items.dia && horaNueva > items.hora && horaNueva < items.tramo){
                    this.horaDisponible = 'Hora no se encuentra Disponible.'; break;
                 }
                 if(dia === items.dia &&horaNueva < 10 || horaNueva > 20){
                  this.horaDisponible = 'Hora no se encuentra Disponible.'; break;
                }
               if(dia === items.dia && horaNueva === items.hora || horaNueva+items.tramo  === items.hora){
                console.log("aqui: ",horaNueva , items.hora , horaNueva+2 , horaNueva+3 )
                this.horaDisponible = 'Hora no se encuentra Disponible.'; break;
               }                                                  
               if(dia === items.dia && horaNueva+horaServicio > items.hora  && horaNueva+horaServicio <= items.tramo){
                console.log("aqui 2: ",horaNueva , items.hora , 'condicion tramo:',items.hora+(items.tramo - items.hora) ,"tramo: ", items.tramo)
                this.horaDisponible = 'Hora no se encuentra Disponible.'; break;
               }
     
                /* console.log("nueva: ",horaNueva, "vieja: ",items.hora-1, 'horaStatic: ', items.hora+2) */
              /*  if(horaNueva < items.hora && horaNueva !== items.hora-1){
                console.log('aqui')
                this.horaDisponible = 'Hora no se encuentra Disponible.'; break;
             } */
                 this.horaDisponible = horaNueva;
              }
                       console.log(this.horaDisponible)
                 if(typeof this.horaDisponible !== typeof '' ){
                  this.agendaService.recibirDatos({nombre , horaNueva , servicio , dia , horaServicio}).subscribe({
                    next : (msg:string) => {
                      this.eventsService.successDatos.emit(true);
                      this.formGroup.controls['nombre'].setValue('');
                      this.formGroup.controls['hora'].setValue('');
                      this.formGroup.controls['servicio'].setValue('');
                      this.success = msg;
                      this.error = '';
                    },
                  error: (msg:string) => {
                    this.error = msg;
                    this.success = '';
                  }
                  
                  }) 
                 }
              
    },error: (error:any) => {
      console.log('entro en el erroe')
         console.log(error)
    }})
  }

  cambiosForm(){
    this.formGroup.controls['nombre'].valueChanges.subscribe( valor => {
         if(valor.length >= 1)
            this.success = '';
         
    })
    this.formGroup.controls['hora'].valueChanges.subscribe( valor => {
      if(valor.length >= 1)
           this.success = '';
      
 })

 this.formGroup.controls['servicio'].valueChanges.subscribe( valor => {
  if(valor.length >= 1)
       this.success = '';
})
  }

 

}
