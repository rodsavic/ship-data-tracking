import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-ship-tracking',
  imports: [],
  templateUrl: './ship-tracking.html',
  styleUrls: ['./ship-tracking.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShipTracking {
  private map!: L.Map;
  private shipMarker!: L.Marker;
  private shipMarker2!: L.Marker;
  private shipPath!: L.Polyline;
  private shipPath2!: L.Polyline;
  private coordinates: L.LatLngExpression[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.simulateShipMovement();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-34.7000, -57.5000], // Buenos Aires
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // marcador inicial del buque
    const startPos: L.LatLngExpression = [-34.7000, -57.5000];
    const startPos2: L.LatLngExpression = [-34.5000, -57.4000];
    this.coordinates.push(startPos);
    this.shipMarker = L.marker(startPos, {
      icon: L.divIcon({
        className: 'ship-icon',
        html: '<div class="pulse" style="color:blue;"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).addTo(this.map);

    this.shipMarker2 = L.marker(startPos2, {
      icon: L.divIcon({
        className: 'ship-icon',
        html: '<div class="pulse"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).addTo(this.map);

    // línea de recorrido
    this.shipPath = L.polyline(this.coordinates, {
      color: 'gray',          
      weight: 3,              
      dashArray: '8, 8',      
      opacity: 0.7            
    }).addTo(this.map);
  }

  private simulateShipMovement(): void {
    setInterval(() => {
      // Simulación de nuevas coordenadas
      const last = this.coordinates[this.coordinates.length - 1] as [number, number];
      const newPos: L.LatLngExpression = [
        last[0] + (Math.random() - 0.5) * 0.001,
        last[1] + (Math.random() - 0.5) * 0.001
      ];

      this.coordinates.push(newPos);

      // mover el marcador
      this.shipMarker.setLatLng(newPos);
      this.shipMarker2.setLatLng([newPos[0] as number + 0.2, newPos[1] as number + 0.1]);

      // actualizar la línea de recorrido
      this.shipPath.setLatLngs(this.coordinates);

      // centrar el mapa en la nueva posición
      this.map.panTo(newPos);
    }, 5000); // cada 5 segundos
  }
}
