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

  constructor(
    private formBuilder : FormBuilder,
    private usuariosService : UsuariosService,
  ) { 
    this.formRegister = this.formBuilder.group({
      nombre : ['', [Validators.required ]],
      correo  : ['',  [Validators.required ]],
      clave  : ['',  [Validators.required ]],
      telefono  : ['',  [Validators.required ]],
      direccion  : ['',  [Validators.required ]]
     } )
  }

  ngOnInit(): void {
  }

  enviar(){
    const { nombre,
      correo,
      clave,
      telefono,
      direccion } = this.formRegister.value;

      const body = {
        nombre,
        correo,
        clave,
        telefono,
        direccion }
        this.usuariosService.saveUsuarios(body).subscribe(({next : (data) => {
          console.log(data)
        },error: (error) => {
          console.log(error)
          this.messageError = error;
        }}))
      }
  
}
