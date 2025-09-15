import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AsideNavComponent } from "../aside-nav/aside-nav.component";
import { FormsModule } from '@angular/forms';
import { DashboardCamarasBuqueComponent } from "../dashboard-camaras-buque/dashboard-camaras-buque.component";
import { DashboardTemperatureComponent } from "../dashboard-temperature/dashboard-temperature.component";
import { DashboardNivelTanqueComponent } from "../dashboard-nivel-tanque/dashboard-nivel-tanque.component";
import { DashboardGasesDeEscapeNoxComponent } from "../dashboard-gases-de-escape-nox/dashboard-gases-de-escape-nox.component";
import { DashboardGasesDeEscapeSoxComponent } from "../dashboard-gases-de-escape-sox/dashboard-gases-de-escape-sox.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ShipTracking } from "../ship-tracking/ship-tracking";

interface Panel {
  id: number;
  selected: string | null;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    AsideNavComponent,
    DashboardCamarasBuqueComponent,
    DashboardTemperatureComponent,
    DashboardNivelTanqueComponent,
    DashboardGasesDeEscapeNoxComponent,
    DashboardGasesDeEscapeSoxComponent,
    ShipTracking
],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
// Filtros
  buques: string[] = ['DON ARMANDO H', 'DR. SALGADO H', 'ENRIQUE H', 'NAPO H'];
  buqueSeleccionado: string = 'DR. SALGADO H';

  // Lista de tipos de panel disponibles
  tiposPaneles = [
    { id: 'ship-tracking', nombre: 'Seguimiento del buque' },
    { id: 'dashboard-temperature', nombre: 'Temperatura de Escapes' },
    { id: 'dashboard-nivel-tanque', nombre: 'Nivel de Tanque' },
    { id: 'dashboard-gases-nox', nombre: 'Gases de Escape NOx' },
    { id: 'dashboard-gases-sox', nombre: 'Gases de Escape SOx' },
    { id: 'dashboard-camaras-buque', nombre: 'Cámaras del buque' }
  ];

  // Paneles por default
  panels: Panel[] = [
    { id: 1, selected: 'ship-tracking' },
    { id: 2, selected: 'dashboard-camaras-buque' },
    { id: 3, selected: 'dashboard-gases-nox' },
    { id: 4, selected: 'dashboard-gases-sox' }
  ];

  nextId = 5; // como ya usamos 1-4, el próximo será 5

  constructor() {}

  ngOnInit(): void {}

  agregarPanel() {
    this.panels.push({ id: this.nextId++, selected: null });
  }

  eliminarPanel(id: number) {
    this.panels = this.panels.filter(p => p.id !== id);
  }




  // ---- Obtenemos la cantidad de columnas segun la cantidad de panales
  getGridColumns(): string {
    const n = this.panels.length;
    if (n <= 1) return '1fr';
    if (n <= 4) return 'repeat(2, 1fr)';
    if (n <= 6) return 'repeat(3, 1fr)';
    if (n <= 9) return 'repeat(3, 1fr)';
    return 'repeat(4, 1fr)';
  }

   // ---- Obtenemos la cantidad de Filas segun la cantidad de panales
  getGridRows(): string {
    const n = this.panels.length;
    let rows = 1;

    if (n <= 2) rows = 1;
    else if (n <= 4) rows = 2;
    else if (n <= 6) rows = 2;
    else if (n <= 9) rows = 3;
    else rows = 4;

    // ----  Ajustamos la altura de cada fila para que el total sea 83vh
    const rowHeight = (83 / rows).toFixed(2) + 'vh';
    return `repeat(${rows}, ${rowHeight})`;
  }
}
