import { Routes } from '@angular/router';
import { ServicesListComponent } from "./components/services-list/services-list.component";
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    { path: 'servicesList', component: ServicesListComponent },
    { path: 'homePage', component: HomePageComponent}
];
