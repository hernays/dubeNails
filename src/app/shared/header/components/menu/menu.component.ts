import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

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
   public showRegistroArticulos :boolean = false;
   public usuarioActivo: boolean = false;
   public usuarioData : any;
   public test : any = false;
   public showActualizarUser : boolean = false;
   public rolUser : string = '';
   @Output('id')  id : any;

  constructor(
    private eventsService : EventsService,
    private usuariosService : UsuariosService,
    private router : Router,
    private sharedService : SharedService
  ) { }

  ngOnInit(){
    console.log('aqui')
      this.eventsService.cerrarModalLogin.subscribe( (valor: any) => {
                      this.menu = valor;     
                      this.showlogin = valor;
      })
      this.getusuario();
      this.ocultarMenu();
      this.validarRol();
    }

    validarRol(){
      this.sharedService.getRolUser().subscribe((data:any) => {
      this.rolUser = data?.rol;
      if(data === null){
        const token = localStorage.getItem('token') as string;
        this.usuariosService.autorizarToken(token).subscribe({next: (data:any) => {
          console.log("aqui valida",data)
          this.rolUser = data.rol;
          this.sharedService.setRolUser(data);
        },
      error : (error) => {
        console.log(error)
      }})
      }
      })
    }

  salir(){
    this.sharedService.setRolUser('');
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
      this.lista = false; 
      this.menu = false;
      break;
      case 'Iniciar Sesion':
      this.showlogin = false;
      this.tituloMenu = 'Menu';
      this.lista = false; 
      this.menu = false;
      break;
      case 'Subir Foto':
      this.showActualizarUser = false;
      this.tituloMenu = 'Menu';
      this.lista = false; 
      this.menu = false;
      break;
      case 'Registrar Articulos':
      this.showRegistroArticulos = false;
      this.tituloMenu = 'Menu';
      this.lista = false; 
      this.menu = false;
      break;
    }
  }

  getusuario(){
    this.router
    const id = localStorage.getItem('token') as string;
    
  this.usuariosService.getUsuario(id).subscribe({next: (data) => {
  this.usuarioData = data;
  this.usuarioActivo = true;
  this.id = data.id;
  console.log('data' , data.id)
  if(data.image){ 
    const image = data.image.split('.');
    this.usuarioData.image = image[0] +'.'+ image[1]+'.'+ image[2]+'.jpg';
  }
  
  
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

  actualizarUser(){
  this.lista = false;
  this.tituloMenu = 'Subir Foto';
  this.showActualizarUser = true;
  }

  RegistrarArticulos(){
  this.lista = false;
  this.tituloMenu = 'Registrar Articulos';
  this.showRegistroArticulos = true;
  }

  ocultarMenu(){
    this.eventsService.ocultarMenu.subscribe(valor => {
      this.menu = valor;
    })
  }

  imgUserCargada(event:string){
    this.usuarioData.image = event;
    this.cerrarModal();
  }

  cargaArticulo(event:any){
    this.cerrarModal();
  }

}
