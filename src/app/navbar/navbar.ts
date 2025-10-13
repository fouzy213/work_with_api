import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
    <nav>
      <ul>
        <li [routerLink]="['/']">Home</li>

        <li [routerLink]="['movies']">Film</li>

        <li [routerLink]="['series']">Serie</li>
      </ul>
    </nav>
  `,
  styleUrl: './navbar.scss',
})
export class Navbar {}
