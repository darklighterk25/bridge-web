import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {WishlistComponent} from './wishlist.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WishlistComponent
  ]
})
export class WishlistModule {
}
