import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-cancelar-hora',
  templateUrl: './cancelar-hora.component.html',
  styleUrls: ['./cancelar-hora.component.scss']
})
export class CancelarHoraComponent{
@Input('dia') dia : string = '';
@Input('nombre') nombre : string = '';
public modalCancelar : boolean = false;
public day : any = '';
  constructor(
    private agendaService : AgendaService,
    private eventsService : EventsService
  ) {
    this.day = new Date().getDate();
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
