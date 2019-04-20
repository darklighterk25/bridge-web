import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
