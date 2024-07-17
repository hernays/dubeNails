import { Injectable, signal, Signal } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

  export class SignalService {

    registroExitoso = signal(false);


    setRegistroExitoso(){
        console.log('aqui el valor ')
        this.registroExitoso.update(value => !value)
    }
    getRegistroExitoso(){
        console.log(this.registroExitoso())
        return this.registroExitoso();
    }


  }