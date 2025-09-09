import { bootstrapApplication } from '@angular/platform-browser';
import { provideEchartsCore } from 'ngx-echarts';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideEchartsCore({ echarts: () => import('echarts') }),
    
  ]
});
/*
bootstrapApplication(SensorsChart, {
  providers: [provideAnimations()]
})
.catch(err => console.error(err));*/
