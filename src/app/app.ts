import { Component, signal } from '@angular/core';
import { SensorsChart } from "./components/sensors-chart/sensors-chart";

@Component({
  selector: 'app-root',
  imports: [ SensorsChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-mapas');
}
