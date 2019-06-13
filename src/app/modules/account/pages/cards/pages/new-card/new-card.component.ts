import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../../../../../core/services/payment.service';
import {Router} from '@angular/router';

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

  constructor(private _paymentService: PaymentService, private _router: Router) {
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
      'expiration': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$')
        ]
      ),
      'cvv': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(3)
        ]
      )
    });
  }

  ngOnInit() {
    this.paymentForm.valueChanges.subscribe(
      () => {
        this.disablePaymentBtn = !this.paymentForm.valid;
        // this.cardType = this._paymentService.getCardType(this.paymentForm.get('number').value);
      }
    );
  }

  returnToCards() {
    this._router.navigate(['/cuenta/tarjetas/mis-tarjetas']);
  }
}
