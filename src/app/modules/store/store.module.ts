import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {StoreComponent} from './store.component';

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule {
}
