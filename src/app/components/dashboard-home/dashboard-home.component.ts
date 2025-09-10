import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AsideNavComponent } from "../aside-nav/aside-nav.component";
import { FormsModule } from '@angular/forms';
import { DashboardCamarasBuqueComponent } from "../dashboard-camaras-buque/dashboard-camaras-buque.component";
import { ShipTracking } from "../ship-tracking/ship-tracking";
import { DashboardTemperatureComponent } from "../dashboard-temperature/dashboard-temperature.component";
import { DashboardNivelTanqueComponent } from "../dashboard-nivel-tanque/dashboard-nivel-tanque.component";
import { DashboardGasesDeEscapeNoxComponent } from "../dashboard-gases-de-escape-nox/dashboard-gases-de-escape-nox.component";
import { DashboardGasesDeEscapeSoxComponent } from "../dashboard-gases-de-escape-sox/dashboard-gases-de-escape-sox.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NgFor,HeaderComponent, AsideNavComponent, FormsModule, DashboardCamarasBuqueComponent, ShipTracking, DashboardTemperatureComponent, DashboardNivelTanqueComponent, DashboardGasesDeEscapeNoxComponent, DashboardGasesDeEscapeSoxComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit {

  // Filtros
  buques :string[] = ['DON ARMANDO H', 'DR. SALGADO H', 'ENRIQUE H', 'NAPO H'];
  buqueSeleccionado:string = 'DR. SALGADO H';

  constructor(){}

  ngOnInit(): void {
    
  }
}
