import {Routes} from '@angular/router';

import {AccountComponent} from './account.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HistoryComponent} from './pages/history/history.component';
import {ListingsComponent} from './pages/listings/listings.component';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '', component: AccountComponent, children: [
      {path: 'resumen', component: DashboardComponent},
      {path: 'publicaciones', component: ListingsComponent},
      {path: 'historial', component: HistoryComponent},
    ]
  },
  {path: '**', redirectTo: 'resumen', pathMatch: 'full'}
];
