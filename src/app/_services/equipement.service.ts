import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../_model/utilisateur';
import {Observable} from 'rxjs';
import {Equipement} from '../_model/equipement';
import {Agent} from '../_model/agent';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/equipements';
  }

  public getAllEquipements(): Observable<Equipement> {
    return this.http.get<Equipement>(this.Url);
  }

  public getEquipementbyNum(equipement: Equipement): Observable<Equipement> {
    return this.http.get<Equipement>(this.Url + '/' + equipement.numero);
  }

  public getEquipmentsAgent(agent: Agent): Observable<Equipement> {
    return this.http.get<Equipement>(this.Url + 'agent/' + agent.idagent);
  }

  public save(equipement: Equipement): Observable<Object> {
    return this.http.post(this.Url, equipement, this.httpOptions);
  }

  public update(equipement: Equipement): Observable<Object> {
    return this.http.put(this.Url, equipement, this.httpOptions);
  }
}
