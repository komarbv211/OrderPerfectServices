import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule 
  ]
})
export class BookingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bookingDate', 'status', 'paymentStatus', 'totalAmount', 'Actions'];
  dataSource = new MatTableDataSource<Booking>();

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      data => {
        console.log('Bookings data:', data);
        this.dataSource.data = data;
      },
      error => console.error('Error loading bookings', error)
    );
  }

  openDeleteDialog(bookingId: number): void {
    console.log(`Видалити бронювання ID: ${bookingId}`);
    // Додайте логіку відкриття діалогового вікна тут
  }
}
