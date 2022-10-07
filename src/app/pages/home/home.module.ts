import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    NoticiasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NoticiasComponent,
    HomeComponent
  ]
})
export class HomeModule { }
