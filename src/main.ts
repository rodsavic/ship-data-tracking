import { bootstrapApplication } from '@angular/platform-browser';
import { provideEchartsCore } from 'ngx-echarts';
import { App } from './app/app';
import { SensorsChart } from './app/components/sensors-chart/sensors-chart';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideEchartsCore({ echarts: () => import('echarts') }),
    
  ]
});
/*
bootstrapApplication(SensorsChart, {
  providers: [provideAnimations()]
})
.catch(err => console.error(err));*/
