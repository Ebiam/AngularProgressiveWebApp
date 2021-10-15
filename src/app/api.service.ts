import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getData(id_product:any): Observable<any> {
    return this.http.get('https://node-backend-pwa.herokuapp.com/product/'+ id_product);
  }

  sendToken(token:any): Observable<any> {
    //ici url backend heroku
    return this.http.post('https://node-backend-pwa.herokuapp.com/notification', { subscription:token });
  }
}
