import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../_model/message';
import {Tokens} from '../_model/tokens';
import {UtilisateurService} from './utilisateur.service';
import {Router} from '@angular/router';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  nb = '0';
  private readonly url: string;


  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService) {
    this.url = 'http://localhost:8080/messages';
  }

  public getMessage(id): Observable<Message> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Message>(this.url + '/' + id, httpOptions);
  }

  public getAllMessage(id): Observable<Message[]> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Message[]>(this.url + '/user/' + id, httpOptions);
  }

  public getAllMessagesOuvert(id: string, ouver): Observable<any[]> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Message[]>(this.url + '/user/' + id + '/' + ouver, httpOptions);
  }

  public getMessageCount(id: string, ouver): Observable<string> {
    const token: Tokens = this.tokenService.getAccessToken();
    localStorage.setItem('Token', JSON.stringify(token));
    return this.http.get<string>(this.url + '/count/' + id + '/' + ouver);
  }

  public save(message: Message): Observable<any> {
    const token: Tokens = this.tokenService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, message, httpOptions);
  }

  public update(message: Message): Observable<any> {
    return this.save(message);
  }
}
