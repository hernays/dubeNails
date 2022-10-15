import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  public url : any = `${environment.urlImages}?query=nail%&per_page=30`;
  constructor(
    private http : HttpClient
  ) {}
  

  getImage(){
    const key = '563492ad6f917000010000015cbfca052cfd4807a68977af3c94c491';
    return this.http.get<any>(this.url,{
      headers:{
        Authorization : key
      }
    }).pipe(
      map((data) => {
        const dataFormat = data.photos.map((element:any) => {
         return  element.src.medium
        })
        return dataFormat
      }),
      catchError((error) => {
        return throwError(() => {console.log(error)})
      })
    )
  }


}
