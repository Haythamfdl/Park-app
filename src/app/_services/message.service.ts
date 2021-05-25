import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../_model/message';
import {Tokens} from '../_model/tokens';
import {UtilisateurService} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  nb = '0';
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient,
              private utilisateurService: UtilisateurService) {
    this.url = 'http://localhost:8080/messages';
  }

  public getMessage(id): Observable<Message> {
    return this.http.get<Message>(this.url + '/' + id, this.httpOptions);
  }

  public getAllMessage(id): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/user/' + id, this.httpOptions);
  }

  public getAllMessagesOuvert(id: string, ouver): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/user/' + id + '/' + ouver, this.httpOptions);
  }

  public getMessageCount(id: string, ouver): Observable<string> {
    this.utilisateurService.refreshToken().subscribe(ntoken => {
      this.token = ntoken;
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.token.accesstoken})
      };
    });
    return this.http.get<string>(this.url + '/count/' + id + '/' + ouver, this.httpOptions);
  }

  public save(message: Message): Observable<any> {
    return this.http.post(this.url, message, this.httpOptions);
  }

  public update(message: Message): Observable<any> {
    return this.http.put(this.url, message, this.httpOptions);
  }
}
