import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public modalServicios = false;
  @Input('clienteDetalle') clienteDetalle : any = '';
  @Output('detalleComponent') detalleComponent : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(){
    if(this.clienteDetalle.length !== 0){
     this.modalServicios = true;
    }
  }

  hideModalServicios(){
    this.modalServicios = false;
    this.detalleComponent.emit(false);
  }

}
