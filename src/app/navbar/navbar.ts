import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
    <nav>
      <div class="all_navbar">
        
        
        <div class="burger" (click)="toggleMenu()">
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        
        
        <ul [class.active]="menuActive">         
          <h2 class="title_home">CINEMA</h2>
          
        <li [routerLink]="['/']">Accueil</li>

        <li [routerLink]="['movies']">Film</li>

        <li [routerLink]="['series']">Serie</li>
      </ul>
      </div>
    </nav>
  `,
  styleUrl: './navbar.scss',
})
export class Navbar {
    menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
