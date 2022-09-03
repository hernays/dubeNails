import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  @Output('successDatos') successDatos : EventEmitter<any> = new EventEmitter();

  constructor() { }
}
