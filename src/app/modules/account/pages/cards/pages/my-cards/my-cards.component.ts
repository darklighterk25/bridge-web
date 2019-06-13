import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../../../core/services/card.service';
import {RequestState} from '../../../../../../shared/enums/request-state.enum';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: []
})
export class MyCardsComponent implements OnInit {

  title = 'Tarjetas';
  cards = [];
  cardsState: RequestState;

  constructor(private _cardService: CardService) { }

  ngOnInit() {
    this.cardsState = RequestState.success;
    /*this.cardsState = RequestState.loading;
    this._cardService.getCards().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.cards = response.tarjetas;
              this.cardsState = RequestState.success;
            } else {
              this.cardsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.cardsState = RequestState.error;
          },
          2000
        );
      });*/
  }

}
