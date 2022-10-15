import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,  Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as moment from 'moment';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-registrar-articulos',
  templateUrl: './registrar-articulos.component.html',
  styleUrls: ['./registrar-articulos.component.scss']
})
export class RegistrarArticulosComponent implements OnInit {
  public formArticulos : FormGroup;
  public img : any;
  @Input('idUser') idUser :any;

  constructor(
    private formBuilder : FormBuilder,
    private articulosService :ArticulosService
  ) {
    this.formArticulos = this.formBuilder.group({
      nombre:[''],
      descripcion:['']
    })
   }

  ngOnInit(): void {
  console.log('id',this.idUser)
  }

  cargarImg(event:any){
    this.img = event.target.files[0];
  }

  enviar(){
    moment.locale('es');
    const fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
    const { nombre , descripcion } = this.formArticulos.value;
    /* this.carga = true; */
    let formData = new FormData();
    formData.append('archivo',this.img)
    formData.append('nombre',nombre)
    formData.append('fecha',fecha)
    formData.append('descripcion',descripcion)
    formData.append('id', this.idUser)
    console.log(this.idUser);
    this.articulosService.saveArticulos(formData).subscribe({next: (data) => {
      console.log(data)
     /*  this.carga = false;
      this.message = 'Imagen Cargada con Exito...'; */
    }, error: (err) => {
       console.log(err)
       /*
      this.carga = false;
      this.message = 'No se pudo cargar la imagen...'; */
    }})
  }
}
