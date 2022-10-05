import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,  Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  ) { 
    this.formRegister = this.formBuilder.group({
      nombre : ['', [Validators.required ]],
      correo  : ['',  [Validators.required ]],
      password  : ['',  [Validators.required ]],
      telefono  : ['',  [Validators.required ]],
      direccion  : ['',  [Validators.required ]]
     } )
  }

  ngOnInit(): void {
  }

  enviar(){
    const { nombre,
      correo,
      password,
      telefono,
      direccion } = this.formRegister.value;

      const body = {
        nombre : nombre.toLowerCase(),
        correo : correo.toLowerCase(),
        password,
        telefono,
        rol :'user',
        direccion : direccion.toLowerCase()}
        this.usuariosService.saveUsuarios(body).subscribe(({next : (data) => {
          console.log("resp",data)
          this.messageExito = data.msg;
           this.reset()
        },error: (error) => {
          console.log(error)
          this.messageError = error;
          this.reset()
        }}))
      }


      reset(){
        this.formRegister.controls['nombre'].setValue('')
        this.formRegister.controls['correo'].setValue('')
        this.formRegister.controls['clave'].setValue('')
        this.formRegister.controls['telefono'].setValue('')
        this.formRegister.controls['direccion'].setValue('')
      }
  
}
