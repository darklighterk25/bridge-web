import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
