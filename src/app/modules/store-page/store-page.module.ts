import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {StorePageComponent} from './store-page.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    StorePageComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    StorePageComponent
  ]
})
export class StorePageModule {
}
