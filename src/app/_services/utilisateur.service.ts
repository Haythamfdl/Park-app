import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Utilisateur} from '../_model/utilisateur';
import {Observable} from 'rxjs';
import {Tokens} from '../_model/tokens';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  token: Tokens;
  httpOptions;
  private readonly urlauth: string;
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/utilisateurs';
    this.urlauth = 'http://localhost:8080/login';
  }

  public getById(id): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/id/' + id);
  }

  public authentification(email: string, pass: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', pass);
    return this.http.post(this.urlauth, body);
  }

  public refreshToken(): Observable<Tokens> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptionsRefresh = {
      headers: new HttpHeaders({'content-type': 'application/json', authorization: `Bearer ` + this.token.refreshtoken})
    };
    return this.http.get<Tokens>(this.url + '/refreshToken', httpOptionsRefresh);
  }

  public login(email: string, pass: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/login/' + email + '/' + pass);
  }

  public getByEmail(email: string): Observable<Utilisateur> {

    return this.http.get<Utilisateur>(this.url + '/' + email);
  }

  public save(utilisateur: Utilisateur): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    this.httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json', authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.post(this.url, utilisateur, this.httpOptions);
  }

  public update(utilisateur: Utilisateur): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    this.httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json', authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.put(this.url, utilisateur, this.httpOptions);
  }
}
