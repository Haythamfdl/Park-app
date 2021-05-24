import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../_model/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/permissions';
  }

  public getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.url);
  }
}
