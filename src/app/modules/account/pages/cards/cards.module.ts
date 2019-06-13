import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CardsComponent} from './cards.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {SharedModule} from '../../../../shared/shared.module';
import { NewCardComponent } from './pages/new-card/new-card.component';
import { MyCardsComponent } from './pages/my-cards/my-cards.component';

@NgModule({
  declarations: [
    CardsComponent,
    NewCardComponent,
    MyCardsComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    CardsComponent
  ]
})
export class CardsModule {
}
