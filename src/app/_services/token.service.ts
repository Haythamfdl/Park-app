import { Injectable } from '@angular/core';
import {Tokens} from '../_model/tokens';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Utilisateur} from '../_model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly urlrefresh: string;
  private readonly urltest: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.urlrefresh = 'http://localhost:8080/refreshToken';
    this.urltest = 'http://localhost:8080/testToken';
  }

  public getAccessToken(): Tokens {
    let token: Tokens = JSON.parse(localStorage.getItem('Token'));
    this.testToken(token).subscribe(data => token, errorAccess => {
      this.refreshToken(token).subscribe(nToken => {
        token = nToken;
        localStorage.setItem('Token', JSON.stringify(token));
        return token;
      }, errorRefresh => {
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

  public testToken(token: Tokens): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Utilisateur>(this.urltest, httpOptions);
  }
}
