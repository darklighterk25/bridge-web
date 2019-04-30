import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {PublishComponent} from './publish.component';

@NgModule({
  declarations: [
    PublishComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    PublishComponent
  ]
})
export class PublishModule {
}
