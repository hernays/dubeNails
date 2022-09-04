import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public url : any = `${environment.urlLocal}api/`;
  constructor(
    private http : HttpClient
  ) {}


  getUsuarios(){
    return this.http.get<any>(`${this.url}usuarios`);
  }

  autorizacionUser(body:any){
   return  this.http.post(`${this.url}auth/login` , body  , )
    .pipe(
      map((data:any) => {
        return data.token;
      }),
      catchError((error:any) => {
        return throwError( () => {
          return error;
        })
      })
    )
  }

  autorizarToken(token:string){
    console.log(token)
    return this.http.get(`${this.url}auth/authorization` , {
       headers : {
        authorization : token
       }
      })
      .pipe(
        map((data:any) => {
          console.log(data)
          return data;
        }),
        catchError( (error:any) => {
          console.log("esto: ",error)
          return throwError(() => {
            return error;
          })
        })
      )
  }



}
