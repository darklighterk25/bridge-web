import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SignUpComponent} from './sign-up.component';

import {AngularMaterialModule} from '../angular-material.module';
import {TermsComponent} from '../terms/terms.component';

@NgModule({
  declarations: [
    SignUpComponent
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
