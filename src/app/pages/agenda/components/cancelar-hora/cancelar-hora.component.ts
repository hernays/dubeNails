import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cancelar-hora',
  templateUrl: './cancelar-hora.component.html',
  styleUrls: ['./cancelar-hora.component.scss']
})
export class CancelarHoraComponent implements OnInit{
@Input('dia') dia : string = '';
@Input('nombre') nombre : string = '';
@Input('telefono') telefono : any;
@Input('botonCancelars') botonCancelars : any ;
@Output('returnData') returnData : EventEmitter<any> = new EventEmitter();
public telefonoPrivado = false;
public modalCancelar : boolean = false;
public day : any = '';
public botonCancelar : boolean = false;
  constructor(
    private agendaService : AgendaService,
    private eventsService : EventsService,
    private sharedService : SharedService
  ) {
    this.day = new Date().getDate();
  }

  ngOnInit() {
    this.botonCancelar =  this.botonCancelars ;
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
          if(resp){
            this.agendaService.getDatos().subscribe((data:any) => {
              this.sharedService.setDataAgenda(data);
              const dataDay = data.filter((data:any) => data.dia == this.dia);
              this.returnData.emit(dataDay);
             }) 
          }
       },
    error : () => {
    }})
      }
      this.modalCancelar = false;
  }


}
