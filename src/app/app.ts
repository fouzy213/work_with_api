import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <app-navbar />
    <main>
      <section>
        <router-outlet />
      </section>
    </main>
    <app-footer />
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('work_with_api');
}
