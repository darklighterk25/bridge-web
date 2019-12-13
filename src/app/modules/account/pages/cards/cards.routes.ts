import {Routes} from '@angular/router';
import {CardsComponent} from './cards.component';
import {MyCardsComponent} from './pages/my-cards/my-cards.component';
import {NewCardComponent} from './pages/new-card/new-card.component';


export const CARDS_ROUTES: Routes = [
  {
    path: '', component: CardsComponent, children: [
      {path: 'mis-tarjetas', component: MyCardsComponent},
      {path: 'nueva-tarjeta', component: NewCardComponent},
      {path: '**', redirectTo: 'mis-tarjetas', pathMatch: 'full'}
    ]
  }
];
