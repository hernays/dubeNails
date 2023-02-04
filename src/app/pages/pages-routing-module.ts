import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const pagesRoutes: Routes = [
  {
    path:'', redirectTo : '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)
  },
  {
    path: 'galeria',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path:'contacto',
    loadChildren : () => import('./usuario/contacto.module').then(m => m.ContactoModule)
  },
  {
    path:'confirmacion',
    loadChildren : () => import('./confirmacion/confirmacion.module').then(m => m.ConfirmacionModule)
  },
  {
    path:'giftcard',
    loadChildren : () => import('./giftcard/giftcard.module').then(m => m.GiftcardModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRouter { }
