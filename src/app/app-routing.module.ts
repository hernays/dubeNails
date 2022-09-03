import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';



const routes: Routes = [
  {path: ''         , component : HomeComponent},
  {path: 'home'     , component : HomeComponent},
  {path: 'galeria'  , component : GalleryComponent},
  {path: 'agenda'   , component : AgendaComponent},
  {path: 'usuarios' , component : UsuarioComponent}   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
