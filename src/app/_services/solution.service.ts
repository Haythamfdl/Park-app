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
  private readonly Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:8080/solutions';
  }

  public getSolutionsProblem(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.Url + '/problem/' + id);
  }

  public getSolutionsUtilisateur(id): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.Url + '/user/' + id);
  }

  public getSolution(id): Observable<Solution> {
    return this.http.get<Solution>(this.Url + '/' + id);
  }

  public save(solution: Solution): Observable<Object> {
    return this.http.post(this.Url, solution, this.httpOptions);
  }

  public update(solution: Solution): Observable<Object> {
    return this.http.put(this.Url, solution, this.httpOptions);
  }
}
