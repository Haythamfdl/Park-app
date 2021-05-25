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
    return this.http.get<Probleme[]>(this.url, this.httpOptions);
  }

  public getProblemesAgent(agent: Agent): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.url + '/agent/' + agent.idagent, this.httpOptions);
  }

  public getProblemesResolu(resolu): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.url + '/resolu/' + resolu, this.httpOptions);
  }

  public getProbleme(id: string): Observable<Probleme> {
    return this.http.get<Probleme>(this.url + '/' + id, this.httpOptions);
  }

  public save(probleme: Probleme): Observable<any> {
    return this.http.post(this.url, probleme, this.httpOptions);
  }

  public update(probleme: Probleme): Observable<any> {
    return this.http.post(this.url, probleme, this.httpOptions);
  }
}
