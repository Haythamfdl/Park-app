import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../_model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  nb = '0';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/messages';
  }

  public getMessage(id): Observable<Message> {
    return this.http.get<Message>(this.url + '/' + id);
  }

  public getAllMessage(id): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/user/' + id);
  }

  public getAllMessagesOuvert(id: string, ouver): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/user/' + id + '/' + ouver);
  }

  public getAllMessagesOuvertCount(id: string, ouver): Observable<string> {
    return this.http.get<string>(this.url + '/count/' + id + '/' + ouver);
  }

  public save(message: Message): Observable<any> {
    return this.http.post(this.url, message, this.httpOptions);
  }

  public update(message: Message): Observable<any> {
    return this.http.put(this.url, message, this.httpOptions);
  }
}
