import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {ContactComponent} from './contact.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule {
}
