import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {EditComponent} from './edit.component';
import {AngularMaterialModule} from '../angular-material.module';
import {UpdateInfoComponent} from './components/update-info/update-info.component';
import {UpdatePasswordComponent} from './components/update-password/update-password.component';
import {UpdatePhotoComponent} from './components/update-photo/update-photo.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';

@NgModule({
  declarations: [
    EditComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    UpdatePhotoComponent,
    UpdateAddressComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
