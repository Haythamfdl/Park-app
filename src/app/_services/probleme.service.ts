import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Probleme} from '../_model/probleme';
import {Agent} from '../_model/agent';
import {Tokens} from '../_model/tokens';


@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/problemes';
  }

  public getAllProblemes(): Observable<Probleme[]> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Probleme[]>(this.url, httpOptions);
  }

  public getProblemesAgent(agent: Agent): Observable<Probleme[]> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Probleme[]>(this.url + '/agent/' + agent.idagent, httpOptions);
  }

  public getProblemesResolu(resolu): Observable<Probleme[]> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Probleme[]>(this.url + '/resolu/' + resolu, httpOptions);
  }

  public getProbleme(id: string): Observable<Probleme> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Probleme>(this.url + '/' + id, httpOptions);
  }

  public save(probleme: Probleme): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.post(this.url, probleme, httpOptions);
  }

  public update(probleme: Probleme): Observable<any> {
    return this.save(probleme);
  }
}
