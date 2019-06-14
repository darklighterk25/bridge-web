import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AngularMaterialModule} from '../angular-material.module';
import {EditPublicationComponent} from './edit-publication.component';

@NgModule({
  declarations: [
    EditPublicationComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    EditPublicationComponent
  ]
})
export class EditPublicationModule {
}
