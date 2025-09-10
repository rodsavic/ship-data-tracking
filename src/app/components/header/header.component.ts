import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  sensoresActivos = 0;
  alertas = 2;
  sistemasOnline = 49;
  totalSensores = 57;
  
}
