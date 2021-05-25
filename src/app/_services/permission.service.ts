import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../_model/permission';
import {Tokens} from '../_model/tokens';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/permissions';
  }

  public getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.url, this.httpOptions);
  }
}
