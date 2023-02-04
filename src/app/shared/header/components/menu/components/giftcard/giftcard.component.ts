import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.scss']
})
export class GiftcardComponent implements OnInit {

  public url :string  = '';
  public urlStatic : string = 'https://dubenails.xyz/giftcard/';
  public opts = ['Esmaltado_Permanente','Poligel','Acrilicas'];
  public productoSelect : string = '';
  constructor() { }

  ngOnInit(): void {
  }

  producto(producto:string){
    this.url = '';
    this.url = this.urlStatic + producto;
    this.productoSelect = producto;
  }

}
