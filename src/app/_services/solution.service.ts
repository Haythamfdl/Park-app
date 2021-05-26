import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Solution} from '../_model/solution';
import {Tokens} from '../_model/tokens';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private readonly url: string;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    this.url = 'http://localhost:8080/solutions';
  }

  public getSolutionsProblem(id): Observable<Solution[]> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Solution[]>(this.url + '/problem/' + id, httpOptions);
  }

  public getSolutionsUtilisateur(id): Observable<Solution[]> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Solution[]>(this.url + '/user/' + id, httpOptions);
  }

  public getSolution(id): Observable<Solution> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.get<Solution>(this.url + '/' + id, httpOptions);
  }

  public save(solution: Solution): Observable<any> {
    const token: Tokens = JSON.parse(localStorage.getItem('Token'));
    const httpOptions = {
      headers: new HttpHeaders({authorization: `Bearer ` + token.accesstoken})
    };
    return this.http.post(this.url, solution, httpOptions);
  }

  public update(solution: Solution): Observable<any> {
    return this.save(solution);
  }
}
