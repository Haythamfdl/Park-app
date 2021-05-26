import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agent} from '../_model/agent';
import {Tokens} from '../_model/tokens';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private readonly url: string;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    this.url = 'http://localhost:8080/agents';
  }

  public getAllAgent(): Observable<Agent[]> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Agent[]>(this.url, httpOptions);
  }

  public getAgentbyNum(num: string): Observable<Agent> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Agent>(this.url + '/' + num, httpOptions);
  }

  public save(agent: Agent): Observable<any> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, agent, httpOptions);
  }

  public update(agent: Agent): Observable<any> {
    return this.save(agent);
  }
}
