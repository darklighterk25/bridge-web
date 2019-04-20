import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {WishlistComponent} from './wishlist.component';

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    WishlistComponent
  ]
})
export class WishlistModule {
}
