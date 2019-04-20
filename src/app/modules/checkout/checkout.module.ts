import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AngularMaterialModule} from '../angular-material.module';
import {CheckoutComponent} from './checkout.component';
import {CreditCardIconComponent} from './components/credit-card-icon/credit-card-icon.component';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';
import {SummaryComponent} from './components/summary/summary.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CreditCardIconComponent,
    SummaryComponent,
    PaymentFormComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CheckoutComponent
  ]
})
export class CheckoutModule {
}
