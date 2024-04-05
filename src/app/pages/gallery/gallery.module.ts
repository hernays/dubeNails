import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutes } from './gallery-routing-module';
import { GalleryComponent } from './gallery.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutes,
    ScrollingModule
  ]
})
export class GalleryModule { }
