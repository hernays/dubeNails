import { EventEmitter, Injectable, Output } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  @Output('successDatos') successDatos : EventEmitter<any> = new EventEmitter();
  @Output('cerrarModalLogin') cerrarModalLogin : EventEmitter<any> = new EventEmitter();
  @Output('loginAdmin') loginAdmin : EventEmitter<any> = new EventEmitter();
  @Output('ocultarMenu') ocultarMenu : EventEmitter<boolean> = new EventEmitter();
  @Output('cargaArticulos') cargaArticulos : EventEmitter<any> = new EventEmitter();

  constructor( ) { 
 
  }

  alertMessage(type:string = 'success' , message:string){
    console.log("en alerta",message)
    const icons = (type === 'success') ? type : 'error';
    return Swal.fire({
      position: 'center',
      icon: icons,
      title: message,
      showConfirmButton: false,
      timer: 2500
    })
  }
 
}
