import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Solution} from '../_model/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/solutions';
  }

  public getSolutionsProblem(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.url + '/problem/' + id);
  }

  public getSolutionsUtilisateur(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.url + '/user/' + id);
  }

  public getSolution(id): Observable<Solution> {
    return this.http.get<Solution>(this.url + '/' + id);
  }

  public save(solution: Solution): Observable<any> {
    return this.http.post(this.url, solution, this.httpOptions);
  }

  public update(solution: Solution): Observable<any> {
    return this.http.put(this.url, solution, this.httpOptions);
  }
}
