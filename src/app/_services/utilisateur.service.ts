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

  private readonly url: string;
  private readonly urlauth: string;
  private readonly urlrefresh: string;
  private readonly urltest: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = 'http://localhost:8080/utilisateurs';
    this.urlauth = 'http://localhost:8080/login';
    this.urlrefresh = 'http://localhost:8080/refreshToken';
    this.urltest = 'http://localhost:8080/testToken';
  }

  public getById(id): Observable<Utilisateur> {
    const token: Tokens = this.getAccessToken();
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

  public getAccessToken(): Tokens {
    let token: Tokens = JSON.parse(localStorage.getItem('Token'));
    this.testToken(token).subscribe(data => token, error => {
      this.refreshToken(token).subscribe(nToken => {
        token = nToken;
        console.log('refreshToken');
        localStorage.setItem('Token', JSON.stringify(token));
        return token;
      }, error2 => {
        localStorage.removeItem('Token');
        localStorage.removeItem('Utilisateur');
        console.log('logout');
        this.router.navigate(['/']).then();
      });
    });
    return token;
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
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.url + '/' + email, httpOptions);
  }

  public testToken(token: Tokens): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.urltest, httpOptions);
  }

  public save(utilisateur: Utilisateur): Observable<any> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, utilisateur, httpOptions);
  }

  public update(utilisateur: Utilisateur): Observable<any> {
    return this.save(utilisateur);
  }
}
