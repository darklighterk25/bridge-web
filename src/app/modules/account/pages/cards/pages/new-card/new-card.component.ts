import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../../../../../core/services/payment.service';
import {Router} from '@angular/router';
import {RequestState} from '../../../../../../shared/enums/request-state.enum';
import {CardService} from '../../../../../../core/services/card.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: []
})
export class NewCardComponent implements OnInit {

  title = 'Nueva tarjeta';
  // cardType: number;
  paymentForm: FormGroup;
  disablePaymentBtn: boolean;
  newState: RequestState;

  constructor(private _paymentService: PaymentService, private _router: Router, private _cardService: CardService) {
    this.disablePaymentBtn = true;
    this.paymentForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'number': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(14)
        ]
      ),
      'type': new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      'expirationDate': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$')
        ]
      ),
      'code': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(4)
        ]
      )
    });
  }

  ngOnInit() {
    this.newState = RequestState.initial;
  }

  returnToCards() {
    this._router.navigate(['/cuenta/tarjetas/mis-tarjetas']);
  }

  new() {
    this.newState = RequestState.loading;
    const data = {
      titular: this.paymentForm.get('name').value,
      numero: this.paymentForm.get('number').value,
      tipo: this.paymentForm.get('type').value,
      fechaVencimiento: this.paymentForm.get('expirationDate').value,
      codigo: this.paymentForm.get('code').value
    };
    this._cardService.newCard(data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.newState = RequestState.success;
            } else {
              this.newState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.newState = RequestState.error;
          },
          2000
        );
      });
  }

  returnToConfiguration() {
    this._router.navigate(['/cuenta/tarjetas/mis-tarjetas']);

  }
}
