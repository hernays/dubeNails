import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,  Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup ;
  constructor(
    private formBuilder : FormBuilder,
    private usuariosService : UsuariosService,
    private eventsService : EventsService
  ) { 
    this.formLogin = this.formBuilder.group({
      usuario : ['', [Validators.required , Validators.minLength(4)]],
      clave  : ['',  [Validators.required , Validators.minLength(6)]] 
     } )
  }

  ngOnInit(): void {
  }


  login(){
    const { usuario , clave } = this.formLogin.value;
      const body  = {
        correo : usuario , password :clave
      }
    this.usuariosService.autorizacionUser(body).subscribe({next: (token:string) => {
                 localStorage.setItem('token' , token );
                 this.eventsService.cerrarModalLogin.emit(false);
    },
    error: () => {

    }})
  }

}
