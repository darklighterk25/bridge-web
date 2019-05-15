import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularMaterialModule} from '../../../modules/angular-material.module';
import {CarCardComponent} from './car-card.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    CarCardComponent
  ],
  imports: [
    AngularMaterialModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    CarCardComponent
  ]
})
export class CarCardModule {
}
