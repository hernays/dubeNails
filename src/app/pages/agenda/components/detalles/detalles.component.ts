import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
import { AgendaService } from 'src/app/services/agenda.service';
import * as moment from 'moment';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public modalServicios = false;
  public clienteDetalle: any[] = [];
  public sumaServicios: Number = 0;
  public habilitar: boolean = true;
  public ids: string[] = [];
  @Output('retornaBoton') retornaBoton: EventEmitter<any> = new EventEmitter();
  @Output('detalleComponent') detalleComponent: EventEmitter<any> = new EventEmitter();
  @Input('dia') dia: any = 0;
  @Input('horas') horas : any[] = [];
  @Input('horasCopias') horasCopias : any[] = [];
  @Input('mes') mes: any;
  @Output('modalRegisters') modalRegisters: any;
  public sinAgenda: string = '';
  public rol: string = '';
  public nombre : string = '';
  public day: any;
  public month: any;
  public n: any = 10;
  readonly VAPID_PUBLIC_KEY = 'BBG9Ywk7mvin-aXmEpLorIVjGeo_8cahwFMYXqFD1VKsCldi_dAYXssJ5moV2pe3vcdqzCtXWS4ru8jn9UlGlrs';
  public symbol: string = '&#128577;';
  constructor(
    private usuariosService: UsuariosService,
    private agendaService: AgendaService,
    private sharedService: SharedService,
    private eventsService: EventsService,
    private swPush: SwPush,
  ) { }

  ngOnInit() {
    this.modalServicios = true;
    this.verificarUsuario();
    this.showHoras();
    this.day = new Date().getDate();
    this.month = new Date().getMonth();

    setTimeout(() => {
    }, 5000)
  }

  hideModalServicios() {
    if (this.ids.length > 0) {
      this.agendaService.actualizarEstado(this.ids).subscribe({
        next: (valor: boolean) => {
        }, error: (error: any) => {
        }
      })
    }
    this.modalServicios = false;
    this.detalleComponent.emit(false);
  }


  verificarUsuario() {
    const token = localStorage.getItem('token') as string;
    this.usuariosService.autorizarToken(token).subscribe({
      next: (data: any) => {
        this.rol = data?.rol;
        this.nombre = data.nombre; // temporal 
        this.sharedService.setRolUser(data);
        this.retornaBoton.emit(true);
      },
      error: (error) => {
        this.retornaBoton.emit(false);
      }
    })
  }

  returnData(event: any) {
    this.retornaBoton.emit(true);
  }

  modalActive() {
    this.clienteDetalle.forEach((element:any) => {
      this.horas.push({horaInicio : element.hora, horaFin : element.tramo})
      this.horasCopias.push({horaInicio : element.hora, horaFin : element.tramo})
    })
    this.notificacion();
    this.modalRegisters = true;
  }

  hideModalRegister(event: any) {
    this.modalRegisters = event;
  }

  showHoras() {
    this.agendaService.getDatosDay(this.dia).subscribe({
      next: (data: any) => {
        this.sharedService.setDataAgenda(data);
        this.clienteDetalle = data;
        data.forEach((element: any) => {
          if (element.nuevo && this.rol === 'admin' && this.nombre !== 'hernays') {
            this.ids.push(element._id);
          }
        });
        this.habilitar = data[0].diaHabilitado;
        this.sharedService.setDiaHabilitado(this.habilitar);
        this.clienteDetalle.forEach(data => this.sumaServicios = this.sumaServicios + data.valor)
      }, error: (error: string) => {
        this.clienteDetalle = [];
        this.sinAgenda = error;
      }
    })

    this.eventsService.successDatos.subscribe(valor => {
      if (valor) {
        this.agendaService.getDatosDay(this.dia).subscribe({
          next: (data: any) => {
            this.clienteDetalle = data;
            this.sharedService.setDataAgenda(data);
            this.sumaServicios = 0;
            this.habilitar = data[0].diaHabilitado;
            this.sharedService.setDiaHabilitado(this.habilitar);
            this.clienteDetalle.forEach(data => this.sumaServicios = this.sumaServicios + data.valor)
          }, error: (error: string) => {
            this.clienteDetalle = [];
            this.sinAgenda = error;
            this.sumaServicios = 0;
          }
        })
      }
    })
  }


  disabledDay() {
    const dataDay = {
      day: this.clienteDetalle[0].dia,
      month: this.clienteDetalle[0].mes,
      habilitar: !this.clienteDetalle[0].diaHabilitado
    }
    this.agendaService.habilitarDia(dataDay).subscribe({
      next: (data: boolean) => {
        this.habilitar = data;
        this.sharedService.setDiaHabilitado(this.habilitar);
      },
      error: (error: any) => {
      }
    })
  }

  notificacion() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.usuariosService.addPushSubscriber(sub).subscribe((data) => {
        })
      })
      .catch(err => {});

  }
}
