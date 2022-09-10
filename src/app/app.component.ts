import { Component, EventEmitter, Input, Output ,  } from '@angular/core';
import { EventsService } from './services/events.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'duberlys';
  public iphoneFooter: boolean = false;

  constructor(  private swUpdate : SwUpdate){
    this.update();
  }
  
  update(){
     if(this.swUpdate.isEnabled){
      console.log('Not Enabled');
      return
      }

      this.swUpdate.available.subscribe( event => {
        console.log('current' , event.current , ' available' , event.available);
        if(confirm('actualizacion pendiente')){
                this.swUpdate.activateUpdate().then(() => location.reload())
        }
      })

      this.swUpdate.activated.subscribe(event => {
        console.log('current previous,' , event.previous , 'available' , event.current) 
      })
  }


}
