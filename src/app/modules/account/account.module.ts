import {AngularMaterialModule} from '../angular-material.module';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AccountComponent} from './account.component';
import {AccountNavbarComponent} from './components/navbar/account-navbar.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HistoryComponent} from './pages/history/history.component';
import {ListingsComponent} from './pages/listings/listings.component';

import {PhonePipe} from '../../shared/pipes/phone.pipe';

@NgModule({
  declarations: [
    AccountComponent,
    AccountNavbarComponent,
    DashboardComponent,
    HistoryComponent,
    ListingsComponent,
    PhonePipe
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule {
}
