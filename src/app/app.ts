import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShipTracking } from "./components/ship-tracking/ship-tracking";
//import { MachinesSensors } from "./components/machines-sensors/machines-sensors";
//import { SensorsChart } from "./components/sensors-chart/sensors-chart";
import { Mapbox } from "./components/mapbox/mapbox";
import { GoogleMaps } from "./components/google-maps/google-maps";
import { SensorsChart } from "./components/sensors-chart/sensors-chart";

@Component({
  selector: 'app-root',
  imports: [ShipTracking, Mapbox, GoogleMaps, SensorsChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-mapas');
}
