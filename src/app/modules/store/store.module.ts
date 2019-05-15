import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {StoreComponent} from './store.component';
import {SharedModule} from '../../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule {
}
