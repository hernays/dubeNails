import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public url : any = `${environment.urlLocal}api/usuarios`;
  constructor(
    private http : HttpClient
  ) {}


  getUsuarios(){
    return this.http.get<any>(`${this.url}`);
  }
}
