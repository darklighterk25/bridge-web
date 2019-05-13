import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import {Direccion} from '../../../../shared/models/direccion.model';
import {Tarjeta} from '../../../../shared/models/tarjeta.model';

import {PaymentService} from '../../../../core/services/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: true}
  }]
})
export class PaymentFormComponent implements OnInit {

  address: Direccion;
  cardType: number;
  creditCard: Tarjeta;
  disableAddressBtn: boolean;
  disablePaymentBtn: boolean;
  title = 'Pago';

  addressForm: FormGroup;
  paymentForm: FormGroup;

  constructor(private _paymentService: PaymentService) {
    this.disableAddressBtn = true;
    this.disablePaymentBtn = true;
    this.addressForm = new FormGroup({
      'calle': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'number': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
      'interiorNumber': new FormControl(
        '',
        Validators.pattern('[a-zA-Z0-9]*')
      ),
      'neighborhood': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'zipCode': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(5)
        ]
      ),
      'phone': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(10)
        ]
      )
    });
    this.paymentForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
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

  ngOnInit(): void {
    this.addressForm.valueChanges.subscribe(
      () => {
        this.disableAddressBtn = !this.addressForm.valid;
      }
    );
    this.paymentForm.valueChanges.subscribe(
      () => {
        this.disablePaymentBtn = !this.paymentForm.valid;
        this.cardType = this._paymentService.getCardType(this.paymentForm.get('number').value);
      }
    );
  }
}
