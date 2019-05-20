import {NgModule} from '@angular/core';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {NotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule {
}
