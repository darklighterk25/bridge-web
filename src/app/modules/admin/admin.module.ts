import {NgModule} from '@angular/core';

import {AdminComponent} from './admin.component';
import {AngularMaterialModule} from '../angular-material.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule {
}
