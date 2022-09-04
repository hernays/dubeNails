import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenuComponent } from './header/components/menu/menu.component';
import { TituloComponent } from './header/components/titulo/titulo.component';
import { RegistroComponent } from './header/components/menu/components/registro/registro.component';
import { LoginComponent } from './header/components/menu/components/login/login.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MenuComponent,
    TituloComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    ContentComponent
  ]
})
export class SharedModule { }
