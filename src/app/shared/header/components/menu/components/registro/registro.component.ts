import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,  Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public formRegister : FormGroup;
  public messageError : any;
  public messageExito : string = '';

  constructor(
    private formBuilder : FormBuilder,
    private usuariosService : UsuariosService,
    private eventsService : EventsService
  ) { 
    this.formRegister = this.formBuilder.group({
      nombre : ['', [Validators.required ]],
      correo  : ['',  [Validators.required ]],
      password  : ['',  [Validators.required ]],
      password2  : ['',  [Validators.required ]],
      telefono  : ['',  [Validators.required ]],
      direccion  : ['',  [Validators.required ]]
     } )
  }

  ngOnInit(): void {
  }

  enviar(){
    this.messageError = '';
    this.messageExito = '';
    const { nombre,
      correo,
      password,
      password2,
      telefono,
      direccion } = this.formRegister.value;

      if(password !== password2){ 
        this.messageError = 'las contraseñas no coinciden';
      return
      }
      const body = {
        nombre : nombre.toLowerCase(),
        correo : correo.toLowerCase(),
        password,
        telefono,
        rol :'user',
        direccion : direccion.toLowerCase()}
        this.usuariosService.saveUsuarios(body).subscribe(({next : (data) => {
          this.eventsService.alertMessage('success','Registrado con Exito');
           this.reset()
        },error: (error) => {
          this.eventsService.alertMessage('error',error) 
          this.reset()
        }}))
      }


      reset(){
        this.formRegister.controls['nombre'].setValue('')
        this.formRegister.controls['correo'].setValue('')
        this.formRegister.controls['password'].setValue('')
        this.formRegister.controls['password2'].setValue('')
        this.formRegister.controls['telefono'].setValue('')
        this.formRegister.controls['direccion'].setValue('')
      }
  
}
