// src/app/service-form/service-form.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../services/service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../models/service.model';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  serviceForm!: FormGroup;
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
  ]; 

  constructor(
    private fb: FormBuilder, 
    private serviceService: ServiceService,
    private dialogRef: MatDialogRef<ServiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service?: Service },
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      id: [this.data?.service?.id || null],
      name: [this.data?.service?.name || '', [Validators.required]],
      description: [this.data?.service?.description || '', [Validators.required]],
      price: [this.data?.service?.price || 0, [Validators.required, Validators.min(0)]],
      provider: [this.data?.service?.provider || '', [Validators.required]],
      rating: [this.data?.service?.rating || 0, [Validators.required, Validators.min(0), Validators.max(5)]],
      reviewCount: [this.data?.service?.reviewCount || 0, [Validators.required, Validators.min(0)]],
      imageUrl: [this.data?.service?.imageUrl || '', [Validators.required]],
      categoryId: [this.data?.service?.categoryId || null, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      if (serviceData.id) {
        this.updateService(serviceData);
      } else {
        this.createService(serviceData);
      }
    }
  }
  
  private updateService(serviceData: Service): void {
    this.serviceService.updateService(serviceData).subscribe(
      response => {
        console.log('Service updated:', response);
        this.showSnackBar('Service updated successfully!');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error updating service:', error);
        this.showSnackBar('Error updating service.');
      }
    );
  }
  
  private createService(serviceData: Service): void {
    this.serviceService.createService(serviceData).subscribe(
      response => {
        console.log('Service created:', response);
        this.showSnackBar('Service created successfully!');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error creating service:', error);
        this.showSnackBar('Error creating service.');
      }
    );
  }
  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
