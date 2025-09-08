import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-machines-sensors',
  imports: [NgxEchartsModule],
  templateUrl: './machines-sensors.html',
  styleUrls: ['./machines-sensors.css']
})
export class MachinesSensors {
  torque = 2450;   // Nm
  potencia = 380;  // kW
  rpm = 380;       // rpm
  empuje = 8.7;    // kN

  gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 5000,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#4caf50'],
              [0.7, '#ff9800'],
              [1, '#f44336']
            ]
          }
        },
        pointer: {
          width: 5,
          length: '70%'
        },
        axisTick: {
          distance: -15,
          length: 8
        },
        splitLine: {
          distance: -20,
          length: 20
        },
        axisLabel: {
          distance: 25,
          fontSize: 12
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} Nm',
          fontSize: 18,
          color: '#fff'
        },
        title: {
          offsetCenter: [0, '80%'],
          fontSize: 14,
          color: '#ccc'
        },
        data: [
          {
            value: this.torque,
            name: 'Torque Hélice'
          }
        ]
      }
    ]
  };
}
