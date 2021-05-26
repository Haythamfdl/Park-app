import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Utilisateur} from '../_model/utilisateur';
import {Observable} from 'rxjs';
import {Tokens} from '../_model/tokens';
import {Router} from '@angular/router';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private readonly url: string;
  private readonly urlauth: string;
  private readonly urlrefresh: string;
  private readonly urltest: string;

  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService) {
    this.url = 'http://localhost:8080/utilisateurs';
    this.urlauth = 'http://localhost:8080/login';
    this.urlrefresh = 'http://localhost:8080/refreshToken';
    this.urltest = 'http://localhost:8080/testToken';
  }

  public getById(id): Observable<Utilisateur> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.url + '/id/' + id, httpOptions);
  }

  public authentification(email: string, pass: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', pass);
    return this.http.post(this.urlauth, body);
  }

  /*public login(email: string, pass: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/login/' + email + '/' + pass);
  }*/

  public getByEmail(email: string): Observable<Utilisateur> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.url + '/' + email, httpOptions);
  }

  public save(utilisateur: Utilisateur): Observable<any> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, utilisateur, httpOptions);
  }

  public update(utilisateur: Utilisateur): Observable<any> {
    return this.save(utilisateur);
  }
}
