import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-cancelar-hora',
  templateUrl: './cancelar-hora.component.html',
  styleUrls: ['./cancelar-hora.component.scss']
})
export class CancelarHoraComponent implements OnInit{
@Input('dia') dia : string = '';
@Input('nombre') nombre : string = '';
@Input('telefono') telefono : any;
public telefonoPrivado = false;
public modalCancelar : boolean = false;
public day : any = '';
public botonCancelar : boolean = false;
  constructor(
    private agendaService : AgendaService,
    private eventsService : EventsService,
    private usuariosService : UsuariosService
  ) {
    this.day = new Date().getDate();
  }

  ngOnInit() {
      this.verificarUsuario();
  }

   verificarUsuario(){
     this.eventsService.loginAdmin.subscribe(valor => {
      if(valor){
        this.botonCancelar = true;
        this.telefonoPrivado = true;
       }
     })
   }
   
  cancelar(){
    this.modalCancelar = true;
    const body = {dia : this.dia , nombre : this.nombre}
  }


  cancelarOperacion(valor:boolean){
      const body = {dia : this.dia , nombre : this.nombre}
      if(valor){
        this.agendaService.borrarHora(body).subscribe({next: (resp) => {
          this.eventsService.successDatos.emit(true);
       },
    error : () => {
    }})
      }

      this.modalCancelar = false;
  }



}
