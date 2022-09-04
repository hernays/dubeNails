import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map  , Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  public agenda = {};
  public dataClientes : any[] = [];
  public url : any = `${environment.urlLocal}api/agenda`;

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

       return this.http.post<any>(`${this.url}/save` , body)
       .pipe(
        map((resp) => {
           return resp.msg;
       }),
       catchError((error:any) => {
             return throwError(() => error.error.msg);
       })
       )
  }

  getDatos():any{
   return this.http.get<any>(`${this.url}`)
  }

  borrarHora(body:any){
   return  this.http.post<any>(`${this.url}/borrarHora` , body)
   .pipe( 
    map( resp => {
      return resp;
    }),
    catchError( (error:any) => {
      return throwError(() => {return error});
    })
   )
  }
}

