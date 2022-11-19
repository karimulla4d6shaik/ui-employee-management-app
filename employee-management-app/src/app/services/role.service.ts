import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = environment.host;
  constructor(private http : HttpClient) { }

  getRoles(page:any, size:any, sortBy:any):Observable<any>{
    return this.http.get(this.url+"v1/roles?page="+page+"&size="+size+"&sort-by="+sortBy);
  }

  deleteRole(roleCode:any):Observable<any>{
    return this.http.delete(this.url+"v1/roles/"+roleCode);
  }
}
