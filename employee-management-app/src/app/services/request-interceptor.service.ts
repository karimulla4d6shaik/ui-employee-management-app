import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStorage } from "../models/storage.model";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  private storeage = new AppStorage();

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedRequest = req;
    let token = this.storeage.getToken();
    if(token){
      modifiedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer "+token)
      });
    }
    return next.handle(modifiedRequest);
  }
}
