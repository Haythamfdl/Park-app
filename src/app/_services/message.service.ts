import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../_model/message';
import {Tokens} from '../_model/tokens';
import {UtilisateurService} from './utilisateur.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  nb = '0';
  token = new Tokens();
  httpOptions = {
    headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;


  constructor(private http: HttpClient,
              private router: Router,
              private utilisateurService: UtilisateurService) {
    this.url = 'http://localhost:8080/messages';
    this.token = JSON.parse(localStorage.getItem('Token'));
  }

  public getMessage(id): Observable<Message> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Message>(this.url + '/' + id, httpOptions);
  }

  public getAllMessage(id): Observable<Message[]> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Message[]>(this.url + '/user/' + id, httpOptions);
  }

  public getAllMessagesOuvert(id: string, ouver): Observable<any[]> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.get<Message[]>(this.url + '/user/' + id + '/' + ouver, httpOptions);
  }

  public getMessageCount(id: string, ouver): Observable<string> {
    const ntoken: Tokens = this.utilisateurService.tokenValable();
    localStorage.setItem('Token', JSON.stringify(ntoken));
    return this.http.get<string>(this.url + '/count/' + id + '/' + ouver);
  }

  public save(message: Message): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
    };
    return this.http.post(this.url, message, httpOptions);
  }

  public update(message: Message): Observable<any> {
    return this.save(message);
  }
}
