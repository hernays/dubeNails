import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public tituloMenu : string = 'Menu';
   public menu : boolean = false;
   public showRegistro : boolean = false;
   public lista        : boolean = false;
   public showlogin    : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  showMenu(){
    this.menu = true;
    this.lista = true;
    console.log( )
  }

  hideMenu(){
    this.menu = false;
  }

  showRegister(){
    this.showRegistro = true;
    this.lista = false;
    this.tituloMenu = 'Registro';
  }

  login(){
    this.showlogin = true;
    this.lista = false;
    this.tituloMenu = 'Iniciar Sesion';
  }

  cerrarModal(){

    switch(this.tituloMenu){
      case 'Menu':  
      this.menu = false; break;
      case 'Registro' : 
      this.showRegistro = false;
      this.tituloMenu = 'Menu';
      this.lista = true; break;
      case 'Iniciar Sesion':
      this.showlogin = false;
      this.tituloMenu = 'Menu';
      this.lista = true; break;
    }
  }

}
