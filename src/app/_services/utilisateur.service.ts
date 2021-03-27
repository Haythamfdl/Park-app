import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../_model/utilisateur';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/utilisateurs';
  }

  public getById(id): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.Url + '/id/' + id);
  }

  public login(email: string, pass: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.Url + '/' + email + '/' + pass);
  }

  public getByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.Url + '/' + email);
  }

  public update(utilisateur: Utilisateur): Observable<Object> {
    return this.http.put(this.Url, utilisateur, this.httpOptions);
  }
}
