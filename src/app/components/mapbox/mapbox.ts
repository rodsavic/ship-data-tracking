import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  imports: [],
  template: `<div id="mapbox-map" class="map-container"></div>`,
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    #mapbox-map {
      position: relative;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    /* Estilos para el marcador personalizado */
    :host ::ng-deep .custom-marker {
  width: 50px;
  height: 50px;
  background-color: #fa0000ff;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
  cursor: pointer;
  display: flex;                /* 👈 centrado interno */
  align-items: center;
  justify-content: center;
  }
  :host ::ng-deep .custom-marker-inner {
  width: 100%;
  height: 100%;
  background-color: #ff4444;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
  animation: markerPulse 2s infinite;
}


    :host ::ng-deep .custom-marker:hover {
      background-color: #ff6666;
      transform: scale(1.1);
      transition: all 0.3s ease;
    }

    @keyframes markerPulse {
      0% { 
        transform: scale(1); 
        opacity: 1; 
      }
      50% { 
        transform: scale(1.2); 
        opacity: 0.7; 
      }
      100% { 
        transform: scale(1); 
        opacity: 1; 
      }
    }

    /* Asegurar que el marcador sea visible sobre el mapa */
    :host ::ng-deep .mapboxgl-marker {
  z-index: 1000 !important;
}
  `]
})
export class Mapbox implements AfterViewInit {
  private map!: mapboxgl.Map;

  ngAfterViewInit(): void {
    // Configuración del mapa
    this.map = new mapboxgl.Map({
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/standard',
      center: [-57.2, -34.6], // Mar abierto frente a Mar del Plata
      zoom: 10,
      accessToken: 'pk.eyJ1Ijoicm9kc2F2aWMiLCJhIjoiY21mNnRqenczMGljYjJscHN1ajBvZ3IxcCJ9.rZkxNPoaAS-55WoEqFu_bQ'
    });

    this.map.on('load', () => {
      console.log('Mapa cargado');
      setTimeout(() => {
        this.map.resize();
        this.addCustomMarker();
      }, 200);
    });

    // Control de navegación
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private addCustomMarker(): void {
    // Crear elemento del marcador personalizado
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.innerHTML = `<div class="custom-marker-inner"></div>`;

    // Crear y agregar el marcador al mapa
    new mapboxgl.Marker({
      element: markerElement,
      anchor: 'center',
      offset: [0, 0]
    }).setLngLat([-57.2, -34.6])
      .addTo(this.map);


  }

  // Método para agregar múltiples marcadores si es necesario
  addMarker(lng: number, lat: number, color: string = '#ff4444', label: string = '🚢'): void {
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundColor = color;
    markerElement.innerHTML = label;
    markerElement.style.fontSize = '18px';

    new mapboxgl.Marker({
      element: markerElement,
      anchor: 'center',
      offset: [0, 0]
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  // Método para limpiar todos los marcadores
  clearMarkers(): void {
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
  }
}