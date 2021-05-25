import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agent} from '../_model/agent';
import {Tokens} from '../_model/tokens';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/agents';
  }

  public getAllAgent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.url, this.httpOptions);
  }

  public getAgentbyNum(num: string): Observable<Agent> {
    return this.http.get<Agent>(this.url + '/' + num, this.httpOptions);
  }

  public save(agent: Agent): Observable<any> {
    return this.http.post(this.url, agent, this.httpOptions);
  }

  public update(agent: Agent): Observable<any> {
    return this.http.post(this.url, agent, this.httpOptions);
  }
}
