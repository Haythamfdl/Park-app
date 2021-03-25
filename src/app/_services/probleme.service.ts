import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Probleme} from '../_model/probleme';
import {Agent} from '../_model/agent';
import {Equipement} from '../_model/equipement';


@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/problemes';
  }

  public getAllProblemes(): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.Url);
  }

  public getProblemesAgent(agent:Agent): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.Url+'/agent/'+agent.idagent);
  }

  public getProblemesResolu(resolu): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.Url+'/resolu/'+resolu);
  }

  public getProbleme(id:string): Observable<Probleme> {
    return this.http.get<Probleme>(this.Url+'/'+id);
  }

  public save(probleme : Probleme): Observable<Object> {
    return this.http.post(this.Url, probleme, this.httpOptions);
  }

  public update(probleme : Probleme): Observable<Object> {
    return this.http.put(this.Url, probleme, this.httpOptions);
  }
}
