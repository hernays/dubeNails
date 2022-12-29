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
        nombre : datos.nombre.trim(),
        dia    : datos.dia,
        hora   : datos.horaNueva,
        servicio : datos.servicio,
        horaServicio    : datos.horaServicio,
        telefono        : datos.telefono,
        mes             : datos.mes,
        id              :datos.id,
        nuevo           :datos.nuevo
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
   .pipe(
    map((data :any) => {
      let array:any[] = [];
      data.agenda.forEach((element:any) =>   array.push(element));
      array.sort((a:any , b:any) => a.hora - b.hora)
      return array;
    }),catchError((error:any) => {
      return throwError(() => error.error.msg );
    })
   )
  }

  getDatosDay(dataDay:any):any{
   return this.http.get<any>(`${this.url}/${dataDay.day}/${dataDay.month}`)
   .pipe(
    map((data :any) => {
      let array:any[] = [];
      data.agenda.forEach((element:any) =>   array.push(element));
      array.sort((a:any , b:any) => a.hora - b.hora)
      return array;
    }),catchError((error:any) => {
      return throwError(() => error.error.msg );
    })
   )
  }

  habilitarDia(dataDay:any):any{
    return this.http.get<any>(`${this.url}/${dataDay.day}/${dataDay.month}/${dataDay.habilitar}`)
    .pipe(
     map((data :any) => {
      /*  let array:any[] = [];
       data.agenda.forEach((element:any) =>   array.push(element));
       array.sort((a:any , b:any) => a.hora - b.hora)
       return array; */
       return data.habilitar;
     }),catchError((error:any) => {
       return throwError(() => error.error.msg );
     })
    )
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

  getTotalValorMes(mes:number){
    return this.http.get<any>(`${this.url}/${mes}`).pipe(
      map((data) => {
       let sumaValor = 0;
        data.filter((element:any) => element.valor !== null)
        .map((dataValor:any) => {
             sumaValor = sumaValor + dataValor.valor;
        })
        return sumaValor
           
      })
      ,catchError((error:any) => {
        return throwError(() => { return error;})
      })
    )

  }


  actualizarEstado(data:any):any{
    return this.http.post<any>(`${this.url}/estado`, data)
    .pipe(
     map((data : boolean) => {
       return data;
     }),catchError((error:any) => {
       return throwError(() => error.error.msg );
     })
    )
   }

}

