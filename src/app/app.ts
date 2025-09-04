import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShipTracking } from "./components/ship-tracking/ship-tracking";

@Component({
  selector: 'app-root',
  imports: [ShipTracking],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-mapas');
}
