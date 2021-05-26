import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../_model/permission';
import {Tokens} from '../_model/tokens';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private readonly url: string;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    this.url = 'http://localhost:8080/permissions';
  }

  public getAllPermissions(): Observable<Permission[]> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Permission[]>(this.url, httpOptions);
  }
}
