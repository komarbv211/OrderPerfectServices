import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; 
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
  ],
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'provider', 'rating', 'reviewCount', 'imageUrl', 'categoryId', 'Actions'];
  dataSource = new MatTableDataSource<Service>(); 

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {}

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

  openDialog(serviceId: number, productName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: { productName } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteService(serviceId); 
      }
    });
  }

  deleteService(serviceId: number): void {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      this.loadServices(); 
    }, error => console.error('Error deleting service', error));
  }
}
