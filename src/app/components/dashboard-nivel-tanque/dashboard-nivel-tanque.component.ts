import { Component, OnInit, OnDestroy } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard-nivel-tanque',
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard-nivel-tanque.component.html',
  styleUrls: ['./dashboard-nivel-tanque.component.css']
})
export class DashboardNivelTanqueComponent implements OnInit, OnDestroy {
  tankOption: EChartsOption = {};
  tankUpdate: EChartsOption = {};
  hydraulicOption: EChartsOption = {};
  hydraulicUpdate: EChartsOption = {};
  engineOption: EChartsOption = {};
  engineUpdate: EChartsOption = {};

  private interval: any;
  private tankLevel: number = 100;
  private hydraulicLevel: number = 100;
  private engineOilLevel: number = 100;

  ngOnInit(): void {
    // Crear opción inicial para cada gauge
    this.tankOption = this.createGaugeOption('#4caf50');
    this.hydraulicOption = this.createGaugeOption('#2196f3');
    this.engineOption = this.createGaugeOption('#ff9800');

    // Actualizar niveles cada segundo
    this.interval = setInterval(() => {
      this.tankLevel -= Math.round(Math.random() * 5 + 1);
      this.hydraulicLevel -= Math.round(Math.random() * 3 + 1);
      this.engineOilLevel -= Math.round(Math.random() * 4 + 1);

      if (this.tankLevel < 0) this.tankLevel = 100;
      if (this.hydraulicLevel < 0) this.hydraulicLevel = 100;
      if (this.engineOilLevel < 0) this.engineOilLevel = 100;

      // Actualizar gráficos
      (this.tankOption.series as any[])[0].data[0].value = this.tankLevel;
      this.tankUpdate = { series: this.tankOption.series };

      (this.hydraulicOption.series as any[])[0].data[0].value = this.hydraulicLevel;
      this.hydraulicUpdate = { series: this.hydraulicOption.series };

      (this.engineOption.series as any[])[0].data[0].value = this.engineOilLevel;
      this.engineUpdate = { series: this.engineOption.series };
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  private createGaugeOption(color: string): EChartsOption {
    return {
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 100,
          detail: { formatter: '{value} %', color: '#fff', fontSize: 23 },
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, '#ff4500'],
                [0.7, '#ffeb3b'],
                [1, color]
              ]
            }
          },
          data: [{ value: 100 }]
        }
      ]
    };
  }
}
