import { Component, EventEmitter, Input, OnInit, Output ,  } from '@angular/core';
import { EventsService } from './services/events.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SwPush } from '@angular/service-worker';
import { UpdateService } from './services/update.service';
function promptUser(event: VersionReadyEvent): boolean {
  return true;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'duberlys';
  public iphoneFooter: boolean = false;
  readonly VAPID_PUBLIC_KEY = 'BBG9Ywk7mvin-aXmEpLorIVjGeo_8cahwFMYXqFD1VKsCldi_dAYXssJ5moV2pe3vcdqzCtXWS4ru8jn9UlGlrs';

  constructor(private sw: UpdateService , private swPush : SwPush) {
    // check the service worker for updates
    this.sw.checkForUpdates();
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
