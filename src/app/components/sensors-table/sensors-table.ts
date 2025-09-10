import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AsideNavComponent } from "../aside-nav/aside-nav.component";

interface Sensor {
  id: number;
  nombre: string;
  tipo: string;
  metrica: string;
  estado: 'Activo' | 'Inactivo';
  valor: string | number;

  min?: number;
  max?: number;
}

@Component({
  selector: 'app-sensors-table',
  imports: [CommonModule, FormsModule, HeaderComponent, AsideNavComponent],
  templateUrl: './sensors-table.html',
  styleUrl: './sensors-table.css'
})
export class SensorsTable {

  sensores: Sensor[] = [];
  sensoresActivos = 0;
  alertas = 2;
  sistemasOnline = 49;
  totalSensores = 57;

  // Filtros
  buques = ['DON ARMANDO H', 'DR. SALGADO H', 'ENRIQUE H', 'NAPO H'];
  tiposSensores: string[] = [];
  buqueSeleccionado = 'DR. SALGADO H';
  tipoSensorSeleccionado = '';

  // Modal
  mostrarModal = false;
  sensorEditando: Sensor | null = null;

  // Catálogo de sensores
  catalogoSensores = [
    { cantidad: 8, tipo: "Nivel de tanque", metrica: "0 a 100%" },
    { cantidad: 1, tipo: "Nivel de aceite hidráulico", metrica: "0 a 100%" },
    { cantidad: 1, tipo: "Nivel aceite motor", metrica: "0 a 100%" },
    { cantidad: 1, tipo: "Posición", metrica: "Coordenadas geográficas" },
    { cantidad: 2, tipo: "Torque eje", metrica: "Potencia %" },
    { cantidad: 2, tipo: "RPM", metrica: "0 a 300" },
    { cantidad: 2, tipo: "Fuerza de empuje", metrica: "Tons" },
    { cantidad: 2, tipo: "Gases de escape NOx", metrica: "ppm" },
    { cantidad: 2, tipo: "Gases de escape SOx", metrica: "ppm" },
    { cantidad: 20, tipo: "Temperatura escapes", metrica: "°C" },
    { cantidad: 15, tipo: "Equipos ON-OFF", metrica: "Estado ON/OFF" },
    { cantidad: 1, tipo: "Profundidad vía navegable", metrica: "Metros" }
  ];

  ngOnInit() {
    this.generarDatosRandomSensores();
    this.tiposSensores = [...new Set(this.catalogoSensores.map(s => s.tipo))];
  }

  generarValor(tipo: string, metrica: string): string | number {
    switch (tipo) {
      case "Cámara de seguridad IP":
        return "Streaming activo";

      case "Nivel de tanque":
      case "Nivel de aceite hidráulico":
      case "Nivel aceite motor":
        return `${Math.floor(Math.random() * 101)}%`;

      case "Posición":
        const lat = (-34 + Math.random()).toFixed(5);
        const lng = (-58 + Math.random()).toFixed(5);
        return `${lat}, ${lng}`;

      case "Torque eje":
        return `${(Math.random() * 100).toFixed(1)} %`;

      case "RPM":
        return Math.floor(Math.random() * 301);

      case "Fuerza de empuje":
        return `${(Math.random() * 50 + 10).toFixed(1)} tons`;

      case "Gases de escape NOx":
      case "Gases de escape SOx":
        return `${Math.floor(Math.random() * 500)} ppm`;

      case "Temperatura escapes":
        return `${(Math.random() * 600 + 100).toFixed(0)} °C`;

      case "Equipos ON-OFF":
        return Math.random() > 0.5 ? "ON" : "OFF";

      case "Profundidad vía navegable":
        return `${(Math.random() * 20 + 2).toFixed(1)} m`;

      default:
        return "N/A";
    }
  }


  generarDatosRandomSensores() {
    const prefijos = ['CADEFA5C', 'VERFSVD42', 'GONMP3', 'FQWBZJ', 'SDQWEFWV', 'FAWB34C', 'VFYHERWR5', 'MNBVCX', 'QWERTY', 'ASDFGH'];
    const sufijos = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let idCounter = 1;

    for (const item of this.catalogoSensores) {
      for (let i = 0; i < item.cantidad; i++) {
        const prefijoRandom = prefijos[Math.floor(Math.random() * prefijos.length)];
        const sufijoRandom = sufijos[Math.floor(Math.random() * sufijos.length)];
        const numeroRandom = Math.floor(Math.random() * 999) + 1;
        const rango = this.generarRango(item.tipo);

        const sensor: Sensor = {
          id: idCounter++,
          nombre: `${prefijoRandom}${sufijoRandom}${numeroRandom}`,
          tipo: item.tipo,
          metrica: item.metrica,
          valor: this.generarValor(item.tipo, item.metrica),
          estado: Math.random() > 0.1 ? 'Activo' : 'Inactivo',
          min: rango ? rango.min : undefined,
          max: rango ? rango.max : undefined
        };

        this.sensores.push(sensor);
      }
    }

    this.sensoresActivos = this.sensores.filter(s => s.estado === 'Activo').length;
  }

  generarRango(tipo: string): { min: number, max: number } | null {
    switch (tipo) {
      case "Nivel de tanque":
      case "Nivel de aceite hidráulico":
      case "Nivel aceite motor":
        return { min: Math.floor(Math.random() * 20), max: 80 + Math.floor(Math.random() * 20) };

      case "Torque eje":
        return { min: 10 + Math.floor(Math.random() * 10), max: 80 + Math.floor(Math.random() * 20) };

      case "RPM":
        return { min: 50 + Math.floor(Math.random() * 50), max: 200 + Math.floor(Math.random() * 100) };

      case "Fuerza de empuje":
        return { min: 5, max: 40 };

      case "Gases de escape NOx":
      case "Gases de escape SOx":
        return { min: 50, max: 300 };

      case "Temperatura escapes":
        return { min: 150, max: 500 };

      case "Profundidad vía navegable":
        return { min: 2, max: 15 };

      default:
        return null;
    }
  }

  fueraDeRango(sensor: Sensor): boolean {
    if (!this.esCuantitativo(sensor) || sensor.min === undefined || sensor.max === undefined) {
      return false;
    }
    const valorNum = parseFloat(sensor.valor as string);
    return !isNaN(valorNum) && (valorNum < sensor.min || valorNum > sensor.max);
  }

  esCuantitativo(sensor: Sensor): boolean {
    const tiposCuantitativos = [
      "Nivel de tanque",
      "Nivel de aceite hidráulico",
      "Nivel aceite motor",
      "Torque eje",
      "RPM",
      "Fuerza de empuje",
      "Gases de escape NOx",
      "Gases de escape SOx",
      "Temperatura escapes",
      "Profundidad vía navegable"
    ];
    return tiposCuantitativos.includes(sensor.tipo);
  }

  configurarSensor(sensor: Sensor) {
    this.sensorEditando = { ...sensor };
    this.mostrarModal = true;
  }

  guardarSensor() {
    if (this.sensorEditando) {
      const index = this.sensores.findIndex(s => s.id === this.sensorEditando!.id);
      if (index !== -1) {
        this.sensores[index] = { ...this.sensorEditando };
      }
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.sensorEditando = null;
  }

  desactivarSensor(sensor: Sensor) {
    sensor.estado = sensor.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.sensoresActivos = this.sensores.filter(s => s.estado === 'Activo').length;
    console.log('Estado cambiado para sensor:', sensor);
  }
}
