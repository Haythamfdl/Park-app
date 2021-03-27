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
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/messages';
  }

  public getMessage(id): Observable<Message> {
    return this.http.get<Message>(this.Url + '/' + id);
  }

  public getAllMessage(id): Observable<Message[]> {
    return this.http.get<Message[]>(this.Url + '/user/' + id);
  }

  public getAllMessagesOuvert(id: string, ouver): Observable<Message[]> {
    return this.http.get<Message[]>(this.Url + '/user/' + id + '/' + ouver);
  }

  public getAllMessagesOuvertCount(id: string, ouver): Observable<string> {
    return this.http.get<string>(this.Url + '/count/' + id + '/' + ouver);
  }

  public save(message: Message): Observable<Object> {
    return this.http.post(this.Url, message, this.httpOptions);
  }

  public update(message: Message): Observable<Object> {
    return this.http.put(this.Url, message, this.httpOptions);
  }
}
