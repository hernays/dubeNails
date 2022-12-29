import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { AgendaService } from 'src/app/services/agenda.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {


  public dias: any[] = [];
  public day: any;
  public mes: any;
  public mesNumber: any;
  public mesAgenda: any;
  public year: any;
  public modalRegisters: boolean = false;
  public dataAgenda: any[] = [];
  public selectDia: any;
  public cargandoData: boolean = false;
  public detalleComponent: boolean = false;
  public clienteDay: any;
  public sumaValorMes: number = 0;
  public rolUsuario: string = '';
  @Output('telefono') telefono: EventEmitter<any> = new EventEmitter();
  @Output('loginAdmin') loginAdmin: EventEmitter<any> = new EventEmitter();
  @Output('dia') dia: any;
  public showModalDetalle: boolean = false;
  public form: FormGroup;
  public diaHabilitado: boolean = true;

  constructor(
    private agendaService: AgendaService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      clienteDia: ['']
    })
  }

  ngOnInit(): void {
    moment.locale('es');
    this.fechas();
    this.verificarUsuario();
  }

  verificarUsuario() {
    this.sharedService.getRolUser().subscribe((rol) => {
      console.log('rols', rol)
      if (rol) {
        this.rolUsuario = (rol.rol) ? rol.rol : '';
        this.totalMes(this.mesAgenda);
      }
    })
  }

  modalRegister(dia: any) {
    this.selectDia = dia;
    if (dia >= this.day) {
      this.modalRegisters = true;
    }
  }

  hideModalRegister(event: any) {
    this.modalRegisters = event;
  }

  fechas() {
    const year = moment().year();
    const month = moment().month();
    this.mes = moment().format('MMMM');
    this.mesNumber = moment().month();
    this.mesAgenda = this.mesNumber;
    this.day = new Date().getDate();
    const dias = moment([year, month]).daysInMonth();

    for (let i = 1; i <= dias; i++) {
      this.dias.push({
        dia: i,
        diaName: moment([year, month, i]).format('dddd')
      });
    }
  }

  dateNext(valor: number) {
    this.dias = [];
    let month = this.mesNumber;
    const year = moment().year();
    month += valor;
    if (month === 12) month = 0;

    let monthNext = moment([year, month]).format('MMMM');
    this.mes = monthNext;
    const monthDay = moment([year, month]).daysInMonth();

    for (let i = 1; i <= monthDay; i++) {
      this.dias.push({
        dia: i,
        diaName: moment([year, month, i]).format('dddd')
      });
    }
    this.mesAgenda = month;

    this.totalMes(this.mesAgenda)
  }

  detalleComponents(event: any) {
    this.detalleComponent = event;
    this.showModalDetalle = false;
  }

  modalAgenda(day: any, month: string, diaName: string) {
    this.dia = { day, month, diaName };
    this.showModalDetalle = true;
  }

  totalMes(mes: number) {
    if (this.rolUsuario === 'admin') {
      this.agendaService.getTotalValorMes(mes).subscribe({
        next: (valor: number) => {
          this.sumaValorMes = valor;
        },
        error: (error: any) => { }
      })
    }
  }

}
