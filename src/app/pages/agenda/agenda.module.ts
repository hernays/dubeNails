import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { CancelarHoraComponent } from './components/cancelar-hora/cancelar-hora.component';




@NgModule({
  declarations: [
    CalendarioComponent,
    ModalRegisterComponent,
    CancelarHoraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports :[
    CalendarioComponent
  ]
})
export class AgendaModule { }
