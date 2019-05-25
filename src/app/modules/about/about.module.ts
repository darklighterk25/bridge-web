import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularMaterialModule} from '../angular-material.module';
import {AboutComponent} from './about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AngularMaterialModule,
    NgbModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
