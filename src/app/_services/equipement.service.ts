import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.Url);
  }

  public getEquipementbyNum(num : string): Observable<Equipement> {
    return this.http.get<Equipement>(this.Url + '/' + num);
  }

  public getEquipmentsAgent(num : string): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.Url + 'agent/' + num);
  }

  public save(equipement: Equipement): Observable<Object> {
    return this.http.post(this.Url, equipement, this.httpOptions);
  }

  public update(equipement: Equipement): Observable<Object> {
    return this.http.put(this.Url, equipement, this.httpOptions);
  }
}
