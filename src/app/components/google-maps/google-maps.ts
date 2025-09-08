import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  template: `
    <google-map
      #mapRef
      height="100%"
      width="100%"
      [center]="center"
      [zoom]="zoom"
      [options]="options">
      <map-marker
        [position]="marker.position"
        [options]="marker.options">
      </map-marker>
    </google-map>
  `,
  styles: [`
    .ship-info, .company-info {
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      margin: 5px;
    }
  `]
})
export class GoogleMaps implements OnInit {
  @ViewChild('mapRef', { static: false }) mapRef!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: -34.6, lng: -57.2 };
  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap'
  };

  marker = {
    position: { lat: -34.6, lng: -57.2 },
    options: {
      icon: {
        url: 'data:image/svg+xml;utf-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
            <circle cx="30" cy="30" r="15" fill="red">
              <animate attributeName="r" values="15;25;15" dur="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
            </circle>
          </svg>
        `),
        scaledSize: new google.maps.Size(60, 60)
      }
    } as google.maps.MarkerOptions
  };

  ngOnInit() {
    setInterval(() => this.moveMarkerRandom(), 2000);
  }

  ngAfterViewInit() {
    const map = this.mapRef.googleMap!;

    // Control con datos del buque (bottom left)
    const infoDiv = document.createElement('div');
    infoDiv.className = 'ship-info';
    infoDiv.innerHTML = `
      <b>Latitud:</b> -34.6000°S<br>
      <b>Lon:</b> -57.2000°E<br>
      <b>Rumbo:</b> 045°<br>
      <b>Velocidad:</b> 12.5 km
    `;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(infoDiv);

    // Control con copyright (bottom right)
    const companyDiv = document.createElement('div');
    companyDiv.className = 'company-info';
    companyDiv.innerHTML = `© Rousseaux EAS 2025`;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(companyDiv);

    // Guardamos referencia para ir actualizando
    this.shipInfoDiv = infoDiv;
  }

  private shipInfoDiv!: HTMLElement;

  moveMarkerRandom() {
    const latChange = (Math.random() - 0.5) * 0.01;
    const lngChange = (Math.random() - 0.5) * 0.01;

    this.marker.position = {
      lat: this.marker.position.lat + latChange,
      lng: this.marker.position.lng + lngChange
    };

    // actualizar el label como en Leaflet
    if (this.shipInfoDiv) {
      this.shipInfoDiv.innerHTML = `
        <b>Latitud:</b> ${this.marker.position.lat.toFixed(4)}°S<br>
        <b>Lon:</b> ${this.marker.position.lng.toFixed(4)}°E<br>
        <b>Rumbo:</b> ${(Math.random() * 360).toFixed(0)}°<br>
        <b>Velocidad:</b> ${(10 + Math.random() * 5).toFixed(1)} km
      `;
    }
  }
}
