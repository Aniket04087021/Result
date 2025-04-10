import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'results',
    pathMatch: 'full'
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./shared/components/result/result.component').then(
        (m) => m.ResultComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profiles/components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'results',
  },
];
