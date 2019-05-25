import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SignUpComponent} from './sign-up.component';

import {AngularMaterialModule} from '../angular-material.module';
import {TermsComponent} from '../terms/terms.component';
import {LoadingComponent} from './components/loading/loading.component';
import {SuccessComponent} from './components/success/success.component';
import {ErrorComponent} from './components/error/error.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LoadingComponent,
    SuccessComponent,
    ErrorComponent
  ],
  entryComponents: [TermsComponent],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule {
}
