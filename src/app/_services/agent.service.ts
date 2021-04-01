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
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/agents';
  }

  public getAllAgent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.url);
  }

  public getAgentbyNum(num: string): Observable<Agent> {
    return this.http.get<Agent>(this.url + '/' + num);
  }

  public save(agent: Agent): Observable<any> {
    return this.http.post(this.url, agent, this.httpOptions);
  }

  public update(agent: Agent): Observable<any> {
    return this.http.put(this.url, agent, this.httpOptions);
  }
}
