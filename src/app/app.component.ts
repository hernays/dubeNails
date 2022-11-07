import { Component, EventEmitter, Input, OnInit, Output ,  } from '@angular/core';
import { EventsService } from './services/events.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SwPush  } from '@angular/service-worker';
import { UpdateService } from './services/update.service';
import { UsuariosService } from './services/usuarios.service';


import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


function promptUser(event: VersionReadyEvent): boolean {
  return true;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'duberlys';
  public respuesta : any;
  public iphoneFooter: boolean = false;
   readonly VAPID_PUBLIC_KEY = 'BBG9Ywk7mvin-aXmEpLorIVjGeo_8cahwFMYXqFD1VKsCldi_dAYXssJ5moV2pe3vcdqzCtXWS4ru8jn9UlGlrs';
 
  constructor(
    private sw: UpdateService , 
     private swPush : SwPush,
    private usuariosService :UsuariosService 
    ) {
    // check the service worker for updates
    this.sw.checkForUpdates();
  }

  ngOnInit(){

   this.notify();
  }

notify(){
  this.swPush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
})
.then(sub => {
  this.usuariosService.addPushSubscriber(sub).subscribe((data) => {
    console.log("la data dub",data)
  })
})
.catch(err => console.error("Could not subscribe to notifications", err));

} 


}
