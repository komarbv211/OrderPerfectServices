import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'https://localhost:7204/api/Services';  

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/GetAll`);
  }


  getServicesById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  createService(booking: Service): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/Create`, booking);
  }

  updateService(booking: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/Update`, booking);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete${id}`);
  }
}
