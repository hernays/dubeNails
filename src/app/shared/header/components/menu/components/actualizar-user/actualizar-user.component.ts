import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-actualizar-user',
  templateUrl: './actualizar-user.component.html',
  styleUrls: ['./actualizar-user.component.scss']
})
export class ActualizarUserComponent implements OnInit {
    public img : any;
    @Input('idUser') idUser: any;
    public carga : boolean = false;
  constructor(
    private usuariosService : UsuariosService
  ){}

  ngOnInit(): void {
  console.log(this.idUser)
  }


  cargarImg(event:any){
    this.img = event.target.files[0];
  }

  submit(){
    this.carga = true;
    let formData = new FormData();
    formData.append('archivo',this.img)
    this.usuariosService.cargaImg(formData , this.idUser).subscribe({next: (data) => {
      console.log(data)
      this.carga = false;
      
    }, error: (err) => {
      console.log(err)
      this.carga = false;
    }})
  }


}
