import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaModule } from './agenda/agenda.module';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AgendaComponent } from './agenda/agenda.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    AgendaComponent,
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    AgendaModule,
    ReactiveFormsModule
  ],
  exports:[
    HomeComponent,
    GalleryComponent,
    AgendaComponent,
    UsuarioComponent

  ]
})
export class PagesModule { }
