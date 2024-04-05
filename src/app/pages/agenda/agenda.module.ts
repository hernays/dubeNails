import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { CancelarHoraComponent } from './components/cancelar-hora/cancelar-hora.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { PipesPipe } from 'src/app/pipes.pipe';
import { AgendaRoutes } from './agenda-routing';
import { AgendaComponent } from './agenda.component';
 

@NgModule({
  declarations: [
    AgendaComponent,
    CalendarioComponent,
    ModalRegisterComponent,
    CancelarHoraComponent,
    DetallesComponent,
    PipesPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgendaRoutes
  ],
  exports :[
    CalendarioComponent
  ]
})
export class AgendaModule { }
