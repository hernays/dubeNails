import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public url : string = `${environment.urlLocal}api/usuarios`;
  constructor(
    private http : HttpClient
  ) {}


  getUsuarios(){
    return this.http.get<any>(`${this.url}`);
  }
}
