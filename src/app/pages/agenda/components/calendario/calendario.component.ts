import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  
  public dias: any[] = [];
  public day : any;
  public mes : any;
  public year: any;
  public modalRegisters : boolean = false;
  public dataAgenda : any[] = [];
  public selectDia : any;
  public horas : number[] = [10,11,12,13,14,15,16,17,18,19,20];
  public cargandoData: boolean = false;
  @Output('telefono')  telefono : EventEmitter<any> = new EventEmitter();
  
  constructor(
    private agendaService : AgendaService,
    private eventsService : EventsService
  ) {}

  ngOnInit(): void {
    moment.locale('es');
    this.fechas();
    this.showHoras();

    this.eventsService.cerrarModalLogin.subscribe((valor:boolean) => {
              if(!valor){
                this.showHoras();
              }
    })
  }

  modalRegister(dia:any){
    this.selectDia = dia;
    if(dia >= this.day){
      this.modalRegisters = true;
    }
  }

  hideModalRegister(event:any){
    this.modalRegisters = event;
  }
  
  fechas(){
    this.mes = moment().format('MMMM');
    let mes = moment().format('MM');
        mes = mes.slice(1);
    this.day = new Date().getDate();
    let diaSemana = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
    let dias = 0;
     switch(Number(mes)){
      case 1 : 
      dias = 31;
      break;
      case 2 : 
      dias = 28;
      break;
      case 3 : 
      dias = 31;
      break;
      case 4 : 
      dias = 30;
      break;
      case 5 : 
      dias = 31;
      break;
      case 6 : 
      dias = 30;
      break;
      case 7 : 
      dias = 31;
      break;
      case 8 :
      dias = 31;
      break;
      case 9 :
      diaSemana = ['Jueves','Viernes','Sabado','Domingo','Lunes','Martes','Miercoles'];
      dias = 30;
      break;
      case 10 :
      diaSemana = ['Sabado','Domingo','Lunes','Martes','Miercoles','Jueves','Viernes'];
      dias = 31;
      break;
      case 11 :
        diaSemana = ['Martes','Miercoles','Jueves','Viernes','Sabado','Domingo','Lunes'];
      dias = 30;
      break;
      case 12 :
        diaSemana = ['Jueves','Viernes','Sabado','Domingo','Lunes','Martes','Miercoles'];
      dias = 31;
      break;
    }

    let dia = 0;  
    for(let i = 1; i<=dias; i++) {
      
      if( i === 1 || i === 8 || i === 15 || i === 22 || i === 29)
        dia === 0;
      else dia ++;

      this.dias.push({dia : i , diaSemana: diaSemana[dia]});
      if(dia === 6) dia = 0;
      }
  }



  showHoras(){
    this.cargandoData = true;
        this.agendaService.getDatos().subscribe((data:any) => {
          this.dataAgenda = data;
          this.cargandoData = false;
        })

    this.eventsService.successDatos.subscribe( valor => {
      if(valor){
        this.agendaService.getDatos().subscribe((data:any) => {
          this.dataAgenda = data;
          this.cargandoData = false;
        })
      }
    })
  }



  Sethoras(){
    const horas =  [10,11,12,13,14,15,16,17,18,19,20]; 
  }

}
