import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EventsService } from 'src/app/services/events.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public modalServicios = false;
  @Input('clienteDetalle') clienteDetalle : any = '';
  @Output('retornaBoton') retornaBoton : EventEmitter<any> = new EventEmitter();
  @Output('detalleComponent') detalleComponent : EventEmitter<any> = new EventEmitter();

  constructor(
    private usuariosService : UsuariosService,
  ) { }

  ngOnInit(){
    if(this.clienteDetalle.length !== 0){
     this.modalServicios = true;
     this.verificarUsuario()
    }
  }

  hideModalServicios(){
    this.modalServicios = false;
    this.detalleComponent.emit(false);
  }


  verificarUsuario(){
    const token = localStorage.getItem('token') as string;
    this.usuariosService.autorizarToken(token).subscribe({next: (data:any) => {
      this.retornaBoton.emit(true);
    },
  error : (error) => {
    this.retornaBoton.emit(false);
  }})
   }

   returnData(event:any){
    this.retornaBoton.emit(true);
    this.clienteDetalle = event;
   }


}
