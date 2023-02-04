import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaModule } from './agenda/agenda.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRouter } from './pages-routing-module';
import { GalleryModule } from './gallery/gallery.module';
import { ContactoModule } from './usuario/contacto.module';
import { ConfirmacionModule } from './confirmacion/confirmacion.module';
import { GiftcardModule } from './giftcard/giftcard.module';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AgendaModule,
    HomeModule,
    GalleryModule,
    ContactoModule,
    BrowserModule,
    ConfirmacionModule,
    GiftcardModule,
    PagesRouter,
  ],
  exports:[]
})
export class PagesModule { }
