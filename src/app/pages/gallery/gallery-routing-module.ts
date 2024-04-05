import { NgModule } from "@angular/core";
import { Routes , RouterModule } from "@angular/router";
import { GalleryComponent } from "./gallery.component";

const galleryRoutes: Routes = [
    {
        path:'galeria',
        component:GalleryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(galleryRoutes)],
    exports: [RouterModule]
})

export class GalleryRoutes {};