import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ErrorComponent} from './components/error/error.component';
import {LoadingComponent} from './components/loading/loading.component';
import {SignInComponent} from './sign-in.component';
import {AngularMaterialModule} from '../angular-material.module';

@NgModule({
  declarations: [
    ErrorComponent,
    LoadingComponent,
    SignInComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule {
}
