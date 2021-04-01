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
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/utilisateurs';
  }

  public getById(id): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/id/' + id);
  }

  public login(email: string, pass: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/' + email + '/' + pass);
  }

  public getByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/' + email);
  }

  public update(utilisateur: Utilisateur): Observable<any> {
    return this.http.put(this.url, utilisateur, this.httpOptions);
  }
}
