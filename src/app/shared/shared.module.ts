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
import { ActualizarUserComponent } from './header/components/menu/components/actualizar-user/actualizar-user.component';
import { ActualizarFotoComponent } from './header/components/menu/components/actualizar-foto/actualizar-foto.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerModule } from './spinner/spinner.module';
import { SpinnerInterceptor } from '../interceptores/interceptor';
import { RegistrarArticulosComponent } from './header/components/menu/components/registrar-articulos/registrar-articulos.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MenuComponent,
    TituloComponent,
    RegistroComponent,
    LoginComponent,
    ActualizarUserComponent,
    RegistrarArticulosComponent,
    ActualizarFotoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    ContentComponent
  ]
})
export class SharedModule { }
