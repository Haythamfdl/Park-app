import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equipement} from '../_model/equipement';
import {Agent} from '../_model/agent';
import {Tokens} from '../_model/tokens';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/equipements';
  }

  public getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.url, this.httpOptions);
  }

  public getEquipementbyNum(num: string): Observable<Equipement> {
    return this.http.get<Equipement>(this.url + '/' + num, this.httpOptions);
  }

  public getEquipmentsAgent(agent: Agent): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.url + '/agent/' + agent.idagent, this.httpOptions);
  }

  public save(equipement: Equipement): Observable<any> {
    return this.http.post(this.url, equipement, this.httpOptions);
  }

  public update(equipement: Equipement): Observable<any> {
    return this.http.put(this.url, equipement, this.httpOptions);
  }
}
