import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private env = environment.host;

  constructor(private http : HttpClient) { }

  login(login:Login):Observable<any>{
    return this.http.post(this.env+"v1/basic/info/login", login);
  }
}
