import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MOCK_SENSORS, RegistroSensor } from '../../sensors-mock';


interface SensorData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-sensors-chart',
  imports: [NgxEchartsModule, NgFor],
  templateUrl: './sensors-chart.html',
  styleUrl: './sensors-chart.css'
})
export class SensorsChart implements OnInit, OnDestroy {

  /*sensors: SensorData[] = [];
  updateInterval: any;
  chartOptions: any;

  // 🚢 Lista de barcos y sensores
  barcos: string[] = ['Rap H', 'Makenita', 'Helena H', 'Estefania H', 'San San H'];
  sensores: string[] = ['Motor', 'Caldera', 'Helices', 'Voltaje'];

  // 📌 Selección actual
  barcoSeleccionado: string = this.barcos[0];
  sensorSeleccionado: string = this.sensores[0];

  constructor() { }

  ngOnInit(): void {
    this.generarDatosIniciales();
    this.setChartOptions();

    // Actualizar cada 5s
    this.updateInterval = setInterval(() => {
      this.actualizarDatos();
      this.setChartOptions();
    }, 5000);
  }

  generarDatosIniciales() {
    this.sensors = [];
    const now = new Date().getTime();
    for (let i = 0; i < 10; i++) {
      this.sensors.push({
        name: new Date(now - i * 1000).toLocaleTimeString(),
        value: this.randomValue()
      });
    }
  }

  actualizarDatos() {
    this.sensors.push({
      name: new Date().toLocaleTimeString(),
      value: this.randomValue()
    });
    if (this.sensors.length > 10) {
      this.sensors.shift();
    }
  }

  setChartOptions() {
  this.chartOptions = {
    backgroundColor: '#2C2F48', // 👈 Fondo
    title: {
      text: `${this.barcoSeleccionado} - ${this.sensorSeleccionado}`,
      left: 'center',
      textStyle: { color: '#fff' } // título en blanco
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: this.sensors.map(d => d.name),
      axisLabel: { color: '#fff' }, // etiquetas en blanco
      axisLine: { lineStyle: { color: '#aaa' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#aaa' } }
    },
    series: [
      {
        data: this.sensors.map(d => d.value),
        type: 'line',
        smooth: true,
        areaStyle: {}, // sombreado
        lineStyle: { color: '#00c3ff' }, // línea celeste
        itemStyle: { color: '#00c3ff' }  // puntos celestes
      }
    ]
  };
}


  onChangeBarco(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.barcoSeleccionado = select.value;
    this.generarDatosIniciales();
    this.setChartOptions();
  }

  onChangeSensor(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sensorSeleccionado = select.value;
    this.generarDatosIniciales();
    this.setChartOptions();
  }


  randomValue(): number {
    return Math.floor(Math.random() * 100);
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }*/


  /*chartOptions: any;

  barcos: string[] = ['Rap H', 'Makenita', 'Helena H', 'Estefania H', 'San San H'];
  sensores: string[] = ['Todos', 'Motor', 'Caldera', 'Helices', 'Voltaje'];

  barcoSeleccionado: string = this.barcos[0];
  sensorSeleccionado: string = 'Todos';

  registros: RegistroSensor[] = MOCK_SENSORS;

  ngOnInit(): void {
    this.setChartOptions();
  }

  setChartOptions() {
    const registrosFiltrados = this.registros.filter(r => r.barco === this.barcoSeleccionado);

    // Si seleccionó "Todos", agregamos todas las series
    let series: any[] = [];
    if (this.sensorSeleccionado === 'Todos') {
      series = registrosFiltrados.map(r => ({
        name: r.sensor,
        type: 'line',
        smooth: true,
        data: r.registros.map(d => d.value)
      }));
    } else {
      const sensorData = registrosFiltrados.find(r => r.sensor === this.sensorSeleccionado);
      if (sensorData) {
        series = [
          {
            name: this.sensorSeleccionado,
            type: 'line',
            smooth: true,
            data: sensorData.registros.map(d => d.value)
          }
        ];
      }
    }

    this.chartOptions = {
      backgroundColor: '#2C2F48',
      title: {
        text: `${this.barcoSeleccionado} - ${this.sensorSeleccionado}`,
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: { trigger: 'axis' },
      legend: {
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: registrosFiltrados[0]?.registros.map(d => d.timestamp) || [],
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      series
    };
  }

  onChangeBarco(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.barcoSeleccionado = select.value;
    this.setChartOptions();
  }

  onChangeSensor(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sensorSeleccionado = select.value;
    this.setChartOptions();
  }*/

  chartOptions: any;

  barcos: string[] = ['Rap H', 'Makenita', 'Helena H', 'Estefania H', 'San San H'];
  sensores: string[] = ['Todos', 'Motor', 'Caldera', 'Helices', 'Voltaje'];

  barcoSeleccionado: string = this.barcos[0];
  sensorSeleccionado: string = 'Todos';

  registros: RegistroSensor[] = MOCK_SENSORS;

  updateInterval: any;

  ngOnInit(): void {
    this.setChartOptions();

    // Actualizamos cada 10s
    this.updateInterval = setInterval(() => {
      this.actualizarDatosRandom();
      this.setChartOptions();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  // Retorna la unidad según el sensor
  getUnidad(sensor: string): string {
    if (sensor === 'Motor' || sensor === 'Caldera') return '°C';
    if (sensor === 'Helices') return 'RPM';
    if (sensor === 'Voltaje') return 'KW';
    return '';
  }

  // Genera un valor random realista según el sensor
  generarValorRandom(sensor: string): number {
    switch (sensor) {
      case 'Motor': return Math.floor(Math.random() * 20) + 60; // 60-80 °C
      case 'Caldera': return Math.floor(Math.random() * 20) + 50; // 50-70 °C
      case 'Helices': return Math.floor(Math.random() * 20) + 30; // 30-50 RPM
      case 'Voltaje': return Math.floor(Math.random() * 20) + 210; // 210-230 KW
      default: return Math.floor(Math.random() * 100);
    }
  }

  // Actualiza los registros agregando un nuevo timestamp y valor random
  actualizarDatosRandom() {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();

    this.registros.forEach(r => {
      r.registros.push({ timestamp, value: this.generarValorRandom(r.sensor) });
      // Mantener solo los últimos 10 registros
      if (r.registros.length > 10) {
        r.registros.shift();
      }
    });
  }
  //GRAFICOS LINEALES
  setChartOptions() {
    const registrosFiltrados = this.registros.filter(r => r.barco === this.barcoSeleccionado);

    let series: any[] = [];
    if (this.sensorSeleccionado === 'Todos') {
      series = registrosFiltrados.map(r => ({
        name: r.sensor,
        type: 'line',
        smooth: true,
        data: r.registros.map(d => d.value)
      }));
    } else {
      const sensorData = registrosFiltrados.find(r => r.sensor === this.sensorSeleccionado);
      if (sensorData) {
        series = [
          {
            name: this.sensorSeleccionado,
            type: 'line',
            smooth: true,
            data: sensorData.registros.map(d => d.value)
          }
        ];
      }
    }

    // X Axis: usar timestamps del primer sensor filtrado
    const xAxisData = registrosFiltrados[0]?.registros.map(d => d.timestamp) || [];

    this.chartOptions = {
      backgroundColor: '#2C2F48',
      title: {
        text: `${this.barcoSeleccionado} - ${this.sensorSeleccionado}`,
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return params.map((p: any) => `${p.seriesName}: ${p.data} ${this.getUnidad(p.seriesName)}`).join('<br/>');
        }
      },
      legend: {
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      series
    };
  }


  // codigo de barra 
  /*setChartOptions() {
    const registrosFiltrados = this.registros.filter(r => r.barco === this.barcoSeleccionado);

    let series: any[] = [];
    if (this.sensorSeleccionado === 'Todos') {
      series = registrosFiltrados.map(r => ({
        name: r.sensor,
        type: 'bar', // 👈 CAMBIO A BARRA
        data: r.registros.map(d => d.value)
      }));
    } else {
      const sensorData = registrosFiltrados.find(r => r.sensor === this.sensorSeleccionado);
      if (sensorData) {
        series = [
          {
            name: this.sensorSeleccionado,
            type: 'bar', // 👈 CAMBIO A BARRA
            data: sensorData.registros.map(d => d.value)
          }
        ];
      }
    }

    // X Axis: usar timestamps del primer sensor filtrado
    const xAxisData = registrosFiltrados[0]?.registros.map(d => d.timestamp) || [];

    this.chartOptions = {
      backgroundColor: '#2C2F48',
      title: {
        text: `${this.barcoSeleccionado} - ${this.sensorSeleccionado}`,
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return params
            .map((p: any) => `${p.seriesName}: ${p.data} ${this.getUnidad(p.seriesName)}`)
            .join('<br/>');
        }
      },
      legend: {
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#aaa' } }
      },
      series
    };
  }*/


  onChangeBarco(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.barcoSeleccionado = select.value;
    this.setChartOptions();
  }

  onChangeSensor(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sensorSeleccionado = select.value;
    this.setChartOptions();
  }


}
