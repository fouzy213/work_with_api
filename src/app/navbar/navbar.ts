import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
    <nav>
      <ul>
        <h2 class="title_home">CINEMA</h2>
        <li [routerLink]="['/']">Accueil</li>

        <li [routerLink]="['movies']">Film</li>

        <li [routerLink]="['series']">Serie</li>
      </ul>
    </nav>
  `,
  styleUrl: './navbar.scss',
})
export class Navbar {}
