import { Routes } from '@angular/router';
import { SensorsTable } from './components/sensors-table/sensors-table';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { SensorsChart } from './components/sensors-chart/sensors-chart';

export const routes: Routes = [
  {
    path: 'sensors-table',
    component: SensorsTable,
  },
    {
    path: 'sensors-graph',
    component: SensorsChart,
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

];