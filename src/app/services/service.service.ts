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

  // service.service.ts
getServices(): Observable<Service[]> {
  return this.http.get<Service[]>(`${this.apiUrl}/GetAll`);
}


  getServicesById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  createServices(booking: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, booking);
  }

  updateServices(id: number, booking: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, booking);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete${id}`);
  }
}
