import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SobreMiComponent } from '../sobre-mi/sobreMi';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    SobreMiComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
