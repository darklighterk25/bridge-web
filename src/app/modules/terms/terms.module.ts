import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {TermsComponent} from './terms.component';

@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    TermsComponent
  ]
})
export class TermsModule {
}
