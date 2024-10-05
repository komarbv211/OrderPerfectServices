import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ServicesListComponent } from "./components/services-list/services-list.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    BookingListComponent, 
    FooterComponent, 
    HeaderComponent,
    ServicesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'order-perfectly-service';
}
