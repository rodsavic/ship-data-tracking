import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard-gases-de-escape-nox',
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard-gases-de-escape-nox.component.html',
  styleUrls: ['./dashboard-gases-de-escape-nox.component.css']
})
export class DashboardGasesDeEscapeNoxComponent implements OnInit, OnDestroy {
  chartOption: EChartsOption = {};
  updateOptions: EChartsOption = {};
  private interval: any;

  // Configurables
  private windowSize = 60;          // cantidad de puntos en pantalla
  private warnThreshold = 200;      // ppm
  private alarmThreshold = 400;     // ppm

  private times: string[] = [];
  private ppm: number[] = [];

  ngOnInit(): void {
    this.chartOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'Gases de escape SOx',
        subtext: 'ppm (partes por millón) • esperando datos...',
        left: 'center',
        textStyle: { color: '#fff', fontSize: 18 },
        subtextStyle: { color: '#ddd', fontSize: 14, fontWeight: 'normal' }
      },
      tooltip: { trigger: 'axis' },
      grid: { left: 48, right: 24, top: 64, bottom: 56 },
      xAxis: {
        type: 'category',
        data: this.times,
        name: 'Tiempo',
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        name: 'ppm',
        min: 0,
        max: 600,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff', fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } }
      },
      dataZoom: [
        { type: 'inside' },
        { type: 'slider', bottom: 8 }
      ],
      series: [
        {
          name: 'NOx',
          type: 'line',
          data: this.ppm,
          smooth: false,
          showSymbol: true,
          symbolSize: 6,
          lineStyle: { width: 2 },
          itemStyle: {
            color: (params: any) => {
              const v = params.value;
              if (v < this.warnThreshold) return '#4caf50'; // verde
              if (v < this.alarmThreshold) return '#ffeb3b'; // amarillo
              return '#f44336'; // rojo
            }
          },
          markLine: {
            symbol: 'none',
            label: { color: '#fff', formatter: ({ value }: any) => `${value} ppm` },
            lineStyle: { type: 'dashed', width: 1.5 },
            data: [
              { yAxis: this.warnThreshold, lineStyle: { color: '#ffeb3b' } },
              { yAxis: this.alarmThreshold, lineStyle: { color: '#f44336' } }
            ]
          },
          areaStyle: { opacity: 0.08 }
        }
      ]
    };

    // Simulación de datos cada 2s
    this.interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      // Simula 50–500 ppm con algo de variación
      const value = 50 + Math.round(Math.random() * 450);

      this.times.push(time);
      this.ppm.push(value);

      if (this.times.length > this.windowSize) {
        this.times.shift();
        this.ppm.shift();
      }

      // KPIs
      const min = Math.min(...this.ppm);
      const max = Math.max(...this.ppm);
      const avg = this.ppm.reduce((a, b) => a + b, 0) / this.ppm.length;

      this.updateOptions = {
        title: { subtext: `ppm (partes por millón) • Min: ${min} | Max: ${max} | Prom: ${avg.toFixed(1)}` },
        xAxis: { data: this.times },
        series: [{ data: this.ppm }]
      };
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }
}
