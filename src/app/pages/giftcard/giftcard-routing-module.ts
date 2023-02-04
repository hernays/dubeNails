import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { GiftcardComponent } from './giftcard.component';


const giftCardRouter: Routes = [
    {
        path: '',
        component: GiftcardComponent,
    },
    {
        path: 'giftcard/Esmaltado_Permanente',
        component: GiftcardComponent
    },
    {
        path: 'giftcard/Acrilicas',
        component: GiftcardComponent
    }
    ,
    {
        path: 'giftcard/Poligel',
        component: GiftcardComponent
    }

]

@NgModule({
    imports: [RouterModule.forChild(giftCardRouter)],
    exports: [RouterModule]
})


export class GiftCardRouter { };

