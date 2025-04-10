import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = `${environment.apiUrl}/results`;

  constructor(private http: HttpClient) { }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.apiUrl);
  }

  getResult(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.apiUrl}/${id}`);
  }

  createResult(result: Result): Observable<Result> {
    return this.http.post<Result>(this.apiUrl, result);
  }

  updateResult(id: string, result: Result): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}/${id}`, result);
  }

  deleteResult(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 