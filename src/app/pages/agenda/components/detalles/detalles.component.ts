import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
import { AgendaService } from 'src/app/services/agenda.service';
import * as moment from 'moment';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public modalServicios = false;
  public clienteDetalle : any[] = [];
  @Output('retornaBoton') retornaBoton : EventEmitter<any> = new EventEmitter();
  @Output('detalleComponent') detalleComponent : EventEmitter<any> = new EventEmitter();
  @Input('dia') dia : any = 0;
  @Output('modalRegisters') modalRegisters : any;
  public sinAgenda : string = '';
  public rol : string = '';
  public day : any;
  constructor(
    private usuariosService : UsuariosService,
    private agendaService : AgendaService,
    private sharedService : SharedService,
    private eventsService : EventsService
  ) { }

  ngOnInit(){
     this.modalServicios = true;
     this.verificarUsuario();
     this.showHoras(); 
     this.day = new Date().getDate();


  }

  hideModalServicios(){
    this.modalServicios = false;
    this.detalleComponent.emit(false);
  }


  verificarUsuario(){
    const token = localStorage.getItem('token') as string;
    this.usuariosService.autorizarToken(token).subscribe({next: (data:any) => {
      this.rol = data.rol;
      this.retornaBoton.emit(true);
    },
  error : (error) => {
    this.retornaBoton.emit(false);
  }})
   }

   returnData(event:any){
    this.retornaBoton.emit(true);
   }

  modalActive(){
    this.modalRegisters = true;
  }

  hideModalRegister(event:any){
    this.modalRegisters = event;
  }

  showHoras(){
        this.agendaService.getDatosDay(this.dia).subscribe({next:(data:any) => {
          this.sharedService.setDataAgenda(data);
          this.clienteDetalle = data;
        },error: (error:string) => {
          this.clienteDetalle = [];
          this.sinAgenda = error;
        }})

   this.eventsService.successDatos.subscribe( valor => {
      if(valor){
        this.agendaService.getDatosDay(this.dia).subscribe({next: (data:any) => {
          this.clienteDetalle = data;
          this.sharedService.setDataAgenda(data);
        },error: (error:string) => {
               this.clienteDetalle = [];
               this.sinAgenda = error;
        }
      })
      }
    })  
  }

}
