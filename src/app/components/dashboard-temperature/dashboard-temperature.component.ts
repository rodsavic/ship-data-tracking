import { Component, OnInit, OnDestroy } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard-temperature',
  templateUrl: './dashboard-temperature.component.html',
  imports: [NgxEchartsDirective],
  styleUrls: ['./dashboard-temperature.component.css']
})
export class DashboardTemperatureComponent implements OnInit, OnDestroy {
  chartOption: EChartsOption = {};
  updateOptions: EChartsOption = {};
  private interval: any;

  private times: string[] = [];
  private temperatures: number[] = [];

  ngOnInit(): void {
    // Configuración inicial
    this.chartOption = {
      title: { 
        text: 'Temperatura de Escapes (°C)',
        subtext: 'Esperando datos...',
        left: 'center',
        textStyle: {
          fontSize: 18,
          color: '#fff'
        },
        subtextStyle: {
          fontSize: 14,
          color: '#ddd',
          fontWeight: 'normal'
        }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.times,
        name: 'Tiempo',
        axisLabel: { color: '#fff', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        name: '°C',
        min: 0,
        max: 600,
        axisLabel: { color: '#fff', fontSize: 10 }
      },
      series: [
        {
          type: 'bar',
          data: this.temperatures,
          itemStyle: {
            color: (params: any) => {
              const value = params.value;
              if (value < 350) return '#4caf50'; // Verde
              if (value < 420) return '#ffeb3b'; // Amarillo
              return '#f44336';                 // Rojo
            }
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 10
          }
        }
      ]
    };

    // Simular datos cada 5s
    this.interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const temp = 300 + Math.round(Math.random() * 200); // 300–500 °C

      this.times.push(time);
      this.temperatures.push(temp);

      if (this.times.length > 20) {
        this.times.shift();
        this.temperatures.shift();
      }

      // Calcular min, max, avg
      const min = Math.min(...this.temperatures);
      const max = Math.max(...this.temperatures);
      const avg =
        this.temperatures.reduce((a, b) => a + b, 0) /
        this.temperatures.length;

      this.updateOptions = {
        title: {
          subtext: `Min: ${min} | Max: ${max} | Prom: ${avg.toFixed(1)}`
        },
        xAxis: { data: this.times },
        series: [{ data: this.temperatures }]
      };
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
