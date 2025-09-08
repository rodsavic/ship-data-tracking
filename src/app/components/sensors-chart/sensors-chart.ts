import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
interface SensorData {
  name: string;
  series: { name: Date; value: number }[];
}

@Component({
  selector: 'app-sensors-chart',
  imports: [NgxChartsModule],
  templateUrl: './sensors-chart.html',
  styleUrl: './sensors-chart.css'
})
export class SensorsChart {
  sensors: SensorData[] = [];
  view: [number, number] = [900, 400];
  updateInterval: any;

  // Opciones de ngx-charts
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tiempo';
  yAxisLabel = 'Valor';
  timeline = true;

  constructor() { }

  ngOnInit(): void {
    // Inicializar sensores
    for (let i = 1; i <= 10; i++) {
      this.sensors.push({
        name: `Sensor ${i}`,
        series: []
      });
    }

    // Generar datos ficticios iniciales
    const now = new Date();
    this.sensors.forEach(sensor => {
      for (let j = 9; j >= 0; j--) {
        sensor.series.push({
          name: new Date(now.getTime() - j * 1000),
          value: this.randomValue()
        });
      }
    });

    // Actualizar datos cada segundo
    this.updateInterval = setInterval(() => {
      const timestamp = new Date();
      this.sensors.forEach(sensor => {
        // Agregar nuevo valor
        sensor.series.push({
          name: timestamp,
          value: this.randomValue()
        });

        // Mantener máximo 10 puntos
        if (sensor.series.length > 10) {
          sensor.series.shift();
        }
      });

      // Forzar actualización de ngx-charts
      this.sensors = [...this.sensors];
    }, 5000);
  }

  randomValue(): number {
    return Math.floor(Math.random() * 100);
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
