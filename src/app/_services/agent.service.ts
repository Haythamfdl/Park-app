import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agent} from '../_model/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/agents';
  }

  public getAllAgent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.Url);
  }

  public getAgentbyNum(num: string): Observable<Agent> {
    return this.http.get<Agent>(this.Url + '/' + num);
  }

  public save(agent: Agent): Observable<Object> {
    return this.http.post(this.Url, agent, this.httpOptions);
  }

  public update(agent: Agent): Observable<Object> {
    return this.http.put(this.Url, agent, this.httpOptions);
  }
}
