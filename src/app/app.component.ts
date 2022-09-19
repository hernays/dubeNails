import { Component, EventEmitter, Input, OnInit, Output ,  } from '@angular/core';
import { EventsService } from './services/events.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'duberlys';
  public iphoneFooter: boolean = false;
  readonly VAPID_PUBLIC_KEY = 'BBG9Ywk7mvin-aXmEpLorIVjGeo_8cahwFMYXqFD1VKsCldi_dAYXssJ5moV2pe3vcdqzCtXWS4ru8jn9UlGlrs';

  constructor( 
     private swUpdate : SwUpdate,
     private swPush : SwPush
     ){
  }

  ngOnInit(): void {
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
          console.log('dentro del if available')
                this.swUpdate.activateUpdate().then(() => location.reload())
        }
      })

      this.swUpdate.activated.subscribe(event => {
        console.log('activated')
        console.log('current previous,' , event.previous , 'available' , event.current) 
      })
  }


test(){
  this.swPush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
  })
  .then((sub => {
    console.log('success')
    console.log(sub)
  }))
  .catch((err) => {console.log('catch'); console.log(err);})
}


}
