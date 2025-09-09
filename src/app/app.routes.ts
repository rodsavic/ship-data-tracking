import { Routes } from '@angular/router';
import { SensorsTable } from './components/sensors-table/sensors-table';

export const routes: Routes = [
  {
    path: 'sensors-table',
    component: SensorsTable,
  },
  {
    path: '',
    redirectTo: 'sensors-table',
    pathMatch: 'full',
  },
];