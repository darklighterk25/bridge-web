import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AngularMaterialModule} from '../angular-material.module';
import {PublishComponent} from './publish.component';

@NgModule({
  declarations: [
    PublishComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PublishComponent
  ]
})
export class PublishModule {
}
