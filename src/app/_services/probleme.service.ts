import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Probleme} from '../_model/probleme';
import {Agent} from '../_model/agent';


@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/problemes';
  }

  public getAllProblemes(): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.url);
  }

  public getProblemesAgent(agent: Agent): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.url + '/agent/' + agent.idagent);
  }

  public getProblemesResolu(resolu): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.url + '/resolu/' + resolu);
  }

  public getProbleme(id: string): Observable<Probleme> {
    return this.http.get<Probleme>(this.url + '/' + id);
  }

  public save(probleme: Probleme): Observable<any> {
    return this.http.post(this.url, probleme, this.httpOptions);
  }

  public update(probleme: Probleme): Observable<any> {
    return this.http.put(this.url, probleme, this.httpOptions);
  }
}
