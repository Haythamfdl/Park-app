import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Solution} from '../_model/solution';
import {Tokens} from '../_model/tokens';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  token: Tokens = JSON.parse(localStorage.getItem('Token'));
  httpOptions = {
    headers: new HttpHeaders({authorization: `Bearer ` + this.token.accesstoken})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/solutions';
  }

  public getSolutionsProblem(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.url + '/problem/' + id, this.httpOptions);
  }

  public getSolutionsUtilisateur(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.url + '/user/' + id, this.httpOptions);
  }

  public getSolution(id): Observable<Solution> {
    return this.http.get<Solution>(this.url + '/' + id, this.httpOptions);
  }

  public save(solution: Solution): Observable<any> {
    return this.http.post(this.url, solution, this.httpOptions);
  }

  public update(solution: Solution): Observable<any> {
    return this.http.post(this.url, solution, this.httpOptions);
  }
}
