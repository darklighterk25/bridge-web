import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {AboutComponent} from './about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
