import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { DefaultImagePipe } from '../../default-image.pipe';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, DefaultImagePipe], 
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'provider', 'rating', 'reviewCount', 'imageUrl', 'categoryId', 'Actions'];
  dataSource = new MatTableDataSource<Service>();

  constructor(private serviceService: ServiceService, private snackBar: MatSnackBar) {} // MatSnackBar через конструктор

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
}
