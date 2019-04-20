import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {EditComponent} from './edit.component';
import {AngularMaterialModule} from '../angular-material.module';
import {UpdateInfoComponent} from './components/update-info/update-info.component';
import {UpdatePasswordComponent} from './components/update-password/update-password.component';

@NgModule({
  declarations: [
    EditComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
