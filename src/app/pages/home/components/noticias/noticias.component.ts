import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
   public datas : any[] = [
    {
      img : 'https://www.telesurtv.net/__export/1638504305316/sites/telesur/img/2021/12/02/p2.jpg',
      comentario:'Comentarios o descripción',
      fecha : '10-10-2022'
    },
    {
      img : 'https://i.blogs.es/fd905a/matthias-mullie-208395-unsplash/450_1000.jpg',
      comentario:'Comentarios o descripción',
      fecha : '10-10-2022'
    },
    {
      img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1PQKbsw0ASgBWG2MCgXORKSodbERm91n3E28bQwbH03nFSsKyVSLo-OmLjlF6S_b87U&usqp=CAU',
      comentario:'Comentarios o descripción',
      fecha : '10-10-2022'
    },
    {
      img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3JDnDssd4_OWpAW7Fmz7mjBsbF4liuvqSHOGmi1jqX76Ej4DYnb3wPTJ-I9cm5CO_u68&usqp=CAU',
      comentario:'Comentarios o descripción',
      fecha : '10-10-2022'
    }
   ];
  constructor(
    private articulosService : ArticulosService
  ) { }

  ngOnInit(): void {
    this.traerArticulos()
  }


  traerArticulos(){
    this.articulosService.getArticulos().subscribe({next:(data) =>{
    console.log(data)
      this.datas = data.map((element :any) => {
        const img = element.img.split('.');
        const data = {
           nombre : element.nombre,
           fecha : element.fecha,
           usuario : element.usuario,
           descripcion : element.descripcion,
           img : img[0] +'.'+ img[1]+'.'+ img[2]+'.jpg'
        }
        return data;
      })

      console.log("this",this.datas)
    },error: (error)=>{
    console.log(error)
    }})
  }


}
