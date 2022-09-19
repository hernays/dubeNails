import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public dataAgenda$ : BehaviorSubject<any> = new BehaviorSubject(null)

  constructor( ) { 
 
  }


  setDataAgenda(data:any){
   this.dataAgenda$.next(data);
  }

  getDataAgenda():BehaviorSubject<any>{
      return this.dataAgenda$;
  }
 
}
