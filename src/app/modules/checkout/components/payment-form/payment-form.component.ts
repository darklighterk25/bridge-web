import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import {Direccion} from '../../../../shared/models/direccion.model';
import {Tarjeta} from '../../../../shared/models/tarjeta.model';

import {PaymentService} from '../../../../core/services/payment.service';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ProviderService} from '../../../../core/services/provider.service';
import {CardService} from '../../../../core/services/card.service';
import {PurchaseService} from '../../../../core/services/purchase.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: true}
  }]
})
export class PaymentFormComponent implements OnInit {

  @Output() providerFeed = new EventEmitter();
  carId: string = null;
  disablePaymentBtn: boolean;
  title = 'Pago';

  providerForm: FormGroup;
  paymentForm: FormGroup;
  providersState: RequestState;
  purchaseState: RequestState;
  providers = [];
  cardsState: RequestState;
  cards = [];

  constructor(private _paymentService: PaymentService,
              private _providerService: ProviderService,
              private _cardService: CardService,
              private _purchaseService: PurchaseService,
              private route: ActivatedRoute) {
    this.disablePaymentBtn = true;
    this.providerForm = new FormGroup({
      'providerIndex': new FormControl(''
        )
      });
    this.paymentForm = new FormGroup({
      'cardIndex': new FormControl('',
        [
          Validators.required
        ]
      )
    });
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('_id')
    this.paymentForm.valueChanges.subscribe(
      () => {
        this.disablePaymentBtn = !this.paymentForm.valid;
      }
    );
    this.getProviders();
    this.getCards();
  }

  getProviders() {
    this.purchaseState = RequestState.initial;
    this.providersState = RequestState.loading;
    this._providerService.getProviders().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.providers = response.proveedoresDeEnvio;
              this.providersState = RequestState.success;
            } else {
              console.log('error');
              this.providersState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.providersState = RequestState.error;
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

  providerFeedChange(event) {
    this.providerFeed.emit( {
      providerFeed: this.providerForm.get('providerIndex').value !== '' ?
        this.providers[this.providerForm.get('providerIndex').value].costo :
        null
    });
  }

  addPurchase () {
    this.purchaseState = RequestState.loading;
    const data = {
      auto: this.carId,
      tarjeta: this.cards[this.paymentForm.get('cardIndex').value]._id,
      proveedorDeEnvio: this.providerForm.get('providerIndex').value !== '' ?
        this.providers[this.providerForm.get('providerIndex').value]._id : null
    };
    console.log(data);
    this._purchaseService.addPurchase(data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.purchaseState = RequestState.success;
            } else {
              this.purchaseState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.purchaseState = RequestState.error;
          },
          2000
        );
      });
  }
}
