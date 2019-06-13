import {Routes} from '@angular/router';

import {AccountComponent} from './account.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HistoryComponent} from './pages/history/history.component';
import {ListingsComponent} from './pages/listings/listings.component';
import {CardsComponent} from './pages/cards/cards.component';
import {AuthenticationGuard} from '../../core/guards/authentication.guard';
import {CARDS_ROUTES} from './pages/cards/cards.routes';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '', component: AccountComponent, children: [
      {path: 'resumen', component: DashboardComponent},
      {path: 'publicaciones', component: ListingsComponent},
      {path: 'tarjetas', children: CARDS_ROUTES, canActivate: [AuthenticationGuard]},
      {path: 'historial', component: HistoryComponent},
      {path: '**', redirectTo: 'resumen', pathMatch: 'full'}
    ]
  }
];
