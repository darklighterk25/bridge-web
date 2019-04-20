import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {FAQComponent} from './faq.component';

@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    FAQComponent
  ]
})
export class FAQModule {
}
