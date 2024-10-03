import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDetail } from '../models/booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {

  private apiUrl = 'https://localhost:7204/api/BookingDetails';  

  constructor(private http: HttpClient) { }

  getBookings(): Observable<BookingDetail[]> {
    return this.http.get<BookingDetail[]>(`${this.apiUrl}/GetAll`);
  }

  getBookingById(id: number): Observable<BookingDetail> {
    return this.http.get<BookingDetail>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: BookingDetail): Observable<BookingDetail> {
    return this.http.post<BookingDetail>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: BookingDetail): Observable<BookingDetail> {
    return this.http.put<BookingDetail>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
