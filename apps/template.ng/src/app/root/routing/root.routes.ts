import { Routes } from '@angular/router';
import { CopyrightComponent } from '../components/copyright/copyright.component';
import { LandingComponent } from '../components/landing/landing.component';

export const routes: Routes = [
  // { path: '', component: AppComponent, pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: () => import('./root.module').then((m) => m.RootModule),
  // },
  { path: '', component: LandingComponent, pathMatch: 'full' },
  {
    path: 'copyright',
    component: CopyrightComponent,
    pathMatch: 'full',
  },
  // { path: '**', component: everywhere, pathMatch: 'full' },
];
