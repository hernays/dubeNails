import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
   public datas : any[] = [];
   public activeMenu : boolean = false;
   public rol : string = '';
  constructor(
    private articulosService : ArticulosService,
    private eventsService : EventsService,
    private sharedService :SharedService
  ) { }

  ngOnInit(): void {
   this.sharedService.getRolUser().subscribe((rol:string) => {
    this.rol = rol;
   });
    this.traerArticulos();
    this.cargaArticulosAsync()
  }


  traerArticulos(){
    this.articulosService.getArticulos().subscribe({next:(data) =>{
      this.datas = data.map((element :any) => {
        const img = element.img.split('.');
        const data = {
           nombre : element.nombre,
           fecha : element.fecha,
           usuario : element.usuario,
           descripcion : element.descripcion,
           img : img[0] +'.'+ img[1]+'.'+ img[2]+'.jpg',
           id:element._id
        }
        return data;
      })

    },error: (error)=>{
    console.log(error)
    }})
  }

  cargaArticulosAsync(){
   this.eventsService.cargaArticulos.subscribe(data => {
    this.datas.push(data);
   })
  }

  activarMenu(){
    this.activeMenu = !this.activeMenu;
  }

  borrarArticulo(id:string){
    this.articulosService.deleteArticulos(id).subscribe({next:(data) => {
        console.log(data)
        this.datas = this.datas.filter((element:any) => element.id !== data._id)
        this.eventsService.alertMessage('success','Articulo borrado');
    },error:(error)=> {
       console.log(error)
       this.eventsService.alertMessage('error','No se pudo Borrar el Articulo')
    }})
  }

}
