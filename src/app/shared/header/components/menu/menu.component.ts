import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

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
   public usuarioActivo: boolean = false;
   public usuarioData : any;
   public test : any = false;

  constructor(
    private eventsService : EventsService,
    private usuariosService : UsuariosService,
    private router : Router
  ) { }

  ngOnInit(){
      this.eventsService.cerrarModalLogin.subscribe( (valor: any) => {
                      this.menu = valor;     
                      this.showlogin = valor;
      })
      
      this.getusuario();

      console.log(this.test)
  }

  salir(){
    localStorage.removeItem('token');
    this.menu         = false;
    this.showRegistro = false;
    this.lista        = false;
    this.showlogin    = false;
    this.usuarioActivo = false;
  }

  showMenu(){
    this.menu = true;
    this.lista = true;
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

  getusuario(){
    this.router
    const id = localStorage.getItem('token') as string;
    
  this.usuariosService.getUsuario(id).subscribe({next: (data) => {
  this.usuarioData = data;
  this.usuarioActivo = true;
  },
 error: (error) => {
 this.usuarioActivo = false;
 }})
  }


  loginUser(event:any){
    this.getusuario();
    setTimeout(() => {
      this.usuarioActivo = event;
    },400)
  }


}
