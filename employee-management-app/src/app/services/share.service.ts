import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private shareData = new Subject<any>();

  constructor() { }

  setInformation(data:any){
    this.shareData.next(data);
  }

  getInformation(): Observable<any>{
    return this.shareData.asObservable();
  }
}
