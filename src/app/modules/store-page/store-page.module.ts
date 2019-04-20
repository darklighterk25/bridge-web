import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {StorePageComponent} from './store-page.component';

@NgModule({
  declarations: [
    StorePageComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    StorePageComponent
  ]
})
export class StorePageModule {
}
