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

  public login(user: Utilisateur): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.Url + '/' + user.email + '/' + user.pass);
  }

  public getByEmail(user: Utilisateur): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.Url + '/' + user.email);
  }
}
