import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map  , Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  public agenda = {};
  public dataClientes : any[] = [];

  constructor(
    private http : HttpClient
  ) { }

  recibirDatos(datos:any):any{
       const body = {
        nombre : datos.nombre,
        dia    : datos.dia,
        hora   : datos.horaNueva,
        servicio : datos.servicio,
        horaServicio    : datos.horaServicio
       }
       console.log('por aqui peticion' , body)
       return this.http.post<any>('http://localhost:1000/agenda/save' , body)
       .pipe(
        map((resp) => {
           return resp.msg;
       }),
       catchError((error:any) => {
        console.log("errors: ",error)
             return throwError(() => error.error.msg);
       })
       )
  }

  getDatos():any{
 
   return this.http.get<any>('http://localhost:1000/agenda')
  }
}
