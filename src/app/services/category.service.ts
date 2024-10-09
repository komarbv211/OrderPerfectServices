import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7204/api/Categories/';  

  constructor(private http: HttpClient) { }

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}GetAll`);
  }


  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}Create`, category);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}Update`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Delete${id}`);
  }
}
