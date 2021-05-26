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
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/equipements';
  }

  public getAllEquipements(): Observable<Equipement[]> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Equipement[]>(this.url, httpOptions);
  }

  public getEquipementbyNum(num: string): Observable<Equipement> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Equipement>(this.url + '/' + num, httpOptions);
  }

  public getEquipmentsAgent(agent: Agent): Observable<Equipement[]> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Equipement[]>(this.url + '/agent/' + agent.idagent, httpOptions);
  }

  public save(equipement: Equipement): Observable<any> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, equipement, httpOptions);
  }

  public update(equipement: Equipement): Observable<any> {
    return this.save(equipement);
  }
}
