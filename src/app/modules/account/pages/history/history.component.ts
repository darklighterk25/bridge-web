import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {PurchaseService} from '../../../../core/services/purchase.service';
import {ProviderService} from '../../../../core/services/provider.service';
import {CardService} from '../../../../core/services/card.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  title = 'Historial de compras';
  purchasesState: RequestState;
  cardsState: RequestState;
  providersState: RequestState;
  purchases: any[];
  providers: any[];
  cards: any[];

  constructor(private _purchaseService: PurchaseService,
              private _providerService: ProviderService,
              private _cardService: CardService) {
  }

  ngOnInit() {
    this.getCards();
  }

  getPurchases() {
    this.purchasesState = RequestState.loading;
    this._purchaseService.getPurchases().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.purchases = response.compras;
              for (let i = 0; i < this.purchases.length; i++) {
                this.purchases[i].cardNumber = this.getCardNumber(this.purchases[i].tarjeta);
                this.purchases[i].providerName = this.getProviderName(this.purchases[i].proveedorDeEnvio);
              }
              this.purchasesState = RequestState.success;
            } else {
              this.purchasesState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.purchasesState = RequestState.error;
          },
          2000
        );
      });
  }

  getCards() {
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
              this.getProviders();
              this.cardsState = RequestState.success;
            } else {
              this.cardsState = RequestState.error;
            }
          },
          0
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.cardsState = RequestState.error;
          },
          0
        );
      });
  }

  getProviders() {
    this.providersState = RequestState.loading;
    this._providerService.getProviders().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.providers = response.proveedoresDeEnvio;
              this.getPurchases();
              this.providersState = RequestState.success;
            } else {
              console.log('error');
              this.providersState = RequestState.error;
            }
          },
          0
        );
      },
      error => {
        setTimeout(
          () => {
            this.providersState = RequestState.error;
          },
          0
        );
      });
  }

  getCardNumber(idTarjeta: string) {
    console.log(idTarjeta);
    let cardNumber = null;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i]._id === idTarjeta) {
        cardNumber = this.cards[i].numero;
        break;
      }
    }
    if (cardNumber === null) {
      cardNumber = 'La tareja ya no esta disponible.';
    }
    return cardNumber;
  }

  getProviderName(idProvider: string) {
    console.log(idProvider);
    let providerName = null;
    if (idProvider !== null) {
      for (let i = 0; i < this.providers.length; i++) {
        if (this.providers[i]._id === idProvider) {
          providerName = this.providers[i].nombre;
          break;
        }
      }
      if (providerName === null) {
        providerName = 'El proveedor de envió ya no esta disponible.';
      }
    } else {
      providerName = 'No se requirió de un proveedor de envío.';
    }
    return providerName;
  }
}
