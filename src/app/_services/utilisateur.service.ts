import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Utilisateur} from '../_model/utilisateur';
import {Observable} from 'rxjs';
import {Tokens} from '../_model/tokens';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));

  private readonly url: string;
  private readonly urlauth: string;
  private readonly urlrefresh: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = 'http://localhost:8080/utilisateurs';
    this.urlauth = 'http://localhost:8080/login';
    this.urlrefresh = 'http://localhost:8080/refreshToken';
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

  public tokenValable(): Tokens {
    this.token = JSON.parse(localStorage.getItem('Token'));
    let user: Utilisateur = JSON.parse(localStorage.getItem('Utilisateur'));
    this.getByEmail(user.email).subscribe(data => {
      user = data;
      localStorage.setItem('Utilisateur', JSON.stringify(user));
      console.log('getEmail');
      return this.token;
    }, error => {
      this.refreshToken(this.token).subscribe(nToken => {
        this.token = nToken;
        console.log('refreshToken');
        localStorage.removeItem('Token');
        localStorage.setItem('Token', JSON.stringify(this.token));
        return this.token;
      }, error2 => {
        localStorage.removeItem('Utilisateur');
        console.log('logout');
        this.router.navigate(['/']).then();
      });
    });
    return this.token;
  }

  public refreshToken(rtoken: Tokens): Observable<Tokens> {
    const httpOptionsRefresh = {
      headers: new HttpHeaders({authorization: 'Bearer ' + rtoken.refreshtoken})
    };
    return this.http.get<Tokens>(this.urlrefresh, httpOptionsRefresh);
  }
  /*public login(email: string, pass: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/login/' + email + '/' + pass);
  }*/
  public getByEmail(email: string): Observable<Utilisateur> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.url + '/' + email, httpOptions);
  }

  public save(utilisateur: Utilisateur): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.post(this.url, utilisateur, httpOptions);
  }

  public update(utilisateur: Utilisateur): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.post(this.url, utilisateur, httpOptions);
  }
}
