import { Component } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
