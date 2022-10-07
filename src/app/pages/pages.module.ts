import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaModule } from './agenda/agenda.module';
import { GalleryComponent } from './gallery/gallery.component';
import { AgendaComponent } from './agenda/agenda.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';




@NgModule({
  declarations: [
    GalleryComponent,
    AgendaComponent,
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    AgendaModule,
    ReactiveFormsModule,
    HomeModule
  ],
  exports:[
    GalleryComponent,
    AgendaComponent,
    UsuarioComponent

  ]
})
export class PagesModule { }
