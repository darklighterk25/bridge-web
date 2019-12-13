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
  deleteState: RequestState;
  cardSelected: number = null;

  constructor(private _cardService: CardService) { }

  ngOnInit() {
    this.deleteState = RequestState.initial;
    this.cardsState = RequestState.loading;
    this._cardService.getCards().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.cards = response.tarjeta;
              for (let i = 0 ; i < this.cards.length; i++) {
                this.cards[i].codigo = this.cards[i].codigo.replace(/[0-9]/g, '·');
              }
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
      });
  }

  deleteConfirmation() {
    this.deleteState = RequestState.loading;
    this._cardService.deleteCard(this.cards[this.cardSelected]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.cards.splice(this.cardSelected, 1);
              this.deleteState = RequestState.success;
            } else {
              this.deleteState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteState = RequestState.error;
          },
          2000
        );
      });
  }

  endDeleteProcess() {
    this.cardSelected = null;
    this.deleteState = RequestState.initial;
  }
}
