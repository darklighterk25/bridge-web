import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularMaterialModule} from '../../../modules/angular-material.module';
import {RouterModule} from '@angular/router';
import {QualificationComponent} from './qualification.component';

@NgModule({
  declarations: [
    QualificationComponent
  ],
  imports: [
    AngularMaterialModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    QualificationComponent
  ]
})
export class QualificationModule {
}
