import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AngularMaterialModule} from '../angular-material.module';
import {DeleteComponent} from './delete.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    DeleteComponent,
    ErrorComponent,
    LoadingComponent,
    SuccessComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    DeleteComponent
  ]
})
export class DeleteModule {
}
