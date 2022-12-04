import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output('registerModal') registerModal: EventEmitter<any> = new EventEmitter();
  @Input('dia') dia: any;
  @Input('horas') horas: any;
  @Input('horasCopias') horasCopias: any;

  public formGroup: FormGroup<any>;
  public lista: any[] = [
    {nombre :'Acrilicas', numberServicio : 3}, 
    {nombre:'Esmaltado Permanente',numberServicio : 1.5},
    {nombre:'Polygel', numberServicio : 2.5}, 
    {nombre:'Solo Retiro', numberServicio :1},
    {nombre:'Manicura (limpieza)',numberServicio : 1.5}, 
    {nombre:'kapping (revestimiento)', numberServicio: 2},
    {nombre:'Relleno acrilico/polygel',numberServicio:1}];
  public success: boolean = false;
  public error: string = '';
  public horaDisponible: string = '';
  public listaHora: string[] = [
    '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5'
    , '14', '14.5', '15', '15.5', '16', '16.5', '17', '17.5', '18', '18.5', '19', '19.5'];
  public modalHoras: boolean = false;
  public horaSelecciona: number = 0;
  public modalServicios: boolean = false;
  public idUser: string = '';
  public rol: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private eventsService: EventsService,
    private sharedService: SharedService
  ) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      servicio: ['Seleccione un servicio...', [Validators.required]],
      hora: ['Seleccione una hora...', [Validators.required, Validators.minLength(2)]],
      telefono: ['']
    })
  }

  ngOnInit(): void {
    this.cambiosForm();
    this.setDataCliente();

    let contador = 0.5;
    this.horas.forEach((h: any) => {
      for (let i = 0; i < 10; i++) {
        if (h.horaInicio < h.horaFin) {
          this.listaHora = this.listaHora.filter(hora => hora != h.horaInicio);
        }
        h.horaInicio = h.horaInicio + contador;
      }
    })

  }

  hideModal() {
    this.registerModal.emit(false);
  }

  formatearServicio(servicio: string) {
    let numberServicio = 0;
    switch (servicio) {
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

  async enviarDatos() {
    this.formGroup.controls['nombre'].enable();
    this.formGroup.controls['telefono'].enable();
    const { nombre, servicio, telefono } = this.formGroup.value;
    const dia = Number(this.dia.day);
    const mes = Number(this.dia.month);
    const hora = Number(this.horaSelecciona);
    const  horaServicio  = this.lista.filter(e => e.nombre === servicio)[0].numberServicio;
    this.traerData(Number(hora), nombre, servicio, dia, horaServicio, telefono, mes)
  }

  async traerData(horaNueva: number, nombre: string, servicio: string, dia: number, horaServicio: number, telefono: any, mes: number) {
    this.agendaService.getDatosDay(this.dia).subscribe({
      next: (data: any) => {
        const tramos = data.map((element: any) => {
          return { horaInicio: element.hora, horaFin: element.tramo, dia: Number(element.dia), mes: element.mes }
        })
        for (let horasDB of tramos) {

         /*  const tiempoServicio = horasDB.horaFin - horasDB.horaInicio; */
            if(dia === horasDB.dia && mes === horasDB.mes && horaNueva === horasDB.horaInicio ||
               dia === horasDB.dia && mes === horasDB.mes && horaNueva > horasDB.horaInicio && horaNueva+horaServicio < horasDB.horaFin ||
               dia === horasDB.dia && mes === horasDB.mes && horaNueva < horasDB.horaInicio && horaNueva+horaServicio > horasDB.horaInicio){
            
               const formatearHoraServicio = (String(horaServicio).length > 1 ) ? String(horaServicio).split('.')[0]+':30' : horaServicio;
            this.horaDisponible = `Servicio ${servicio} demora ${formatearHoraServicio}hrs esta cochando con otra hora revisa la agenda e intenta de nuevo.`;
            this.success = false; break;
            }
        }
        if ( this.horaDisponible === '') {
          this.agendarHora(nombre, horaNueva, servicio, dia, horaServicio, telefono, mes, this.idUser)
        }

      }, error: (error: any) => {
        if (error === 'No se encontraron registros.') {
          this.agendarHora(nombre, horaNueva, servicio, dia, horaServicio, telefono, mes, this.idUser)
        }
      }
    })
  }

  cambiosForm() {
    this.formGroup.controls['nombre'].valueChanges.subscribe(valor => {
      if (valor.length >= 1)
        this.success = false;

    })
    this.formGroup.controls['hora'].valueChanges.subscribe(valor => {
      if (valor.length >= 1)
        this.success = false;

    })

    this.formGroup.controls['servicio'].valueChanges.subscribe(valor => {
      if (valor.length >= 1)
        this.success = false;
    })
  }

  mostrarHoras() {
    this.modalHoras = true;
  }

  hideModalHoras() {
    this.modalHoras = false;
  }

  SeleccionHora(event: any) {
    const evento = event.innerText.split(':');
    this.formGroup.controls['hora'].setValue(
      (evento[1].includes('3')) ? evento[0] + ':30' :
        evento[0] + ':00'
    );
    this.horaSelecciona = (evento[1].includes('3')) ? Number(evento[0] + '.5') : Number(evento[0]);
    this.modalHoras = false;
  }

  mostrarServicios() {
    this.modalServicios = true;
  }

  hideModalServicios() {
    this.modalServicios = false;
  }

  SeleccionServicio(event: any) {
    this.formGroup.controls['servicio'].setValue(event.innerText);
    this.modalServicios = false;
  }

  agendarHora(nombre: string, horaNueva: any, servicio: string, dia: number, horaServicio: any, telefono: any, mes: number, id: string) {
    /* if (!this.lista.includes(servicio)) {
      this.horaDisponible = 'El servicio es obligatorio';
      this.success = false;
      return
    } */

    const nuevo = (this.rol === 'admin') ? false : true;
    this.agendaService.recibirDatos({ nombre, horaNueva, servicio, dia, horaServicio, telefono, mes, id, nuevo }).subscribe({
      next: (msg: string) => {
        this.formGroup.controls['nombre'].setValue('');
        this.formGroup.controls['hora'].setValue('');
        this.formGroup.controls['servicio'].setValue('');
        this.formGroup.controls['telefono'].setValue('');
        this.success = true;
        this.error = '';
        this.eventsService.alertMessage('success', 'Registrado con Exito')
        this.eventsService.successDatos.emit(true);
        this.setDataCliente();
      },
      error: (msg: string) => {
        this.error = msg;
        this.success = false;
        this.eventsService.alertMessage('error', msg)
      }

    })
  }


  setDataCliente() {
    this.sharedService.getRolUser().subscribe(data => {
      this.idUser = data.id;
      this.rol = data.rol;
      if (data?.nombre && data?.rol !== 'admin') {
        this.formGroup.controls['nombre'].disable();
        this.formGroup.controls['nombre'].setValue(data.nombre);
        if (data?.telefono) {
          this.formGroup.controls['telefono'].disable();
          this.formGroup.controls['telefono'].setValue(data.telefono);
        }
      }
    })
  }
}
