import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit,Output } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { DefaultImagePipe } from '../../default-image.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, DefaultImagePipe, StarRatingComponent],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceCardComponent implements OnInit {

  @Output() ratingUpdated = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'provider', 'rating', 'reviewCount', 'imageUrl', 'categoryId', 'Actions'];
  dataSource = new MatTableDataSource<Service>();

  constructor(private serviceService: ServiceService, private snackBar: MatSnackBar) {} 

  ngOnInit(): void {
    this.loadServices(); 
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(
      data => {
        console.log('Services data:', data);
        this.dataSource.data = data; 
      },
      error => console.error('Error loading services', error)
    );
  }
  onRatingUpdated(service: Service, event: any): void {
    const newRating = Number(event);  
    if (!isNaN(newRating)) {
      service.rating = newRating;
      this.serviceService.updateService(service).subscribe(
        response => {
          this.snackBar.open(`Service rating updated to ${newRating}`, 'Close', { duration: 2000 });
        },
        error => {
          console.error('Error updating service rating', error);
          this.snackBar.open('Error updating service rating', 'Close', { duration: 2000 });
        }
      );
    }
  }
}
