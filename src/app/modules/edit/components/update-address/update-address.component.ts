import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../core/services/user.service';
import {RequestState} from '../../../../shared/enums/request-state.enum';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html'
})
export class UpdateAddressComponent implements OnInit {

  disableBtn = true;
  address: FormGroup;
  title = 'Actualizar dirección';
  addressState: RequestState;

  constructor(private _userService: UserService) {
    this.address = new FormGroup({
      'calle': new FormControl(
        {value: '', disabled: this.addressState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'numeroExterior': new FormControl(
        {value: '', disabled: this.addressState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
      'numeroInterior': new FormControl(
        {value: '', disabled: this.addressState === RequestState.loading},
        Validators.pattern('[a-zA-Z0-9]*')
      ),
      'colonia': new FormControl(
        {value: '', disabled: this.addressState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'codigoPostal': new FormControl(
        {value: '', disabled: this.addressState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(5)
        ]
      )
    });
    // Habilita el botón cuando el formulario es válido.
    this.address.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.address.valid;
      }
    );
  }

  ngOnInit() {
    this.addressState = RequestState.initial;
  }

  update(): void {
    const address = {
      calle: this.address.get('calle').value,
      numeroExterior: this.address.get('numeroExterior').value,
      numeroInterior: this.address.get('numeroInterior').value,
      colonia: this.address.get('colonia').value,
      codigoPostal: this.address.get('codigoPostal').value
    };
    this.addressState = RequestState.loading;
    this._userService.updateAddress(address).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.address.get('calle').setValue('');
              this.address.get('calle').markAsPristine();
              this.address.get('calle').markAsUntouched();
              this.address.get('numeroExterior').setValue('');
              this.address.get('numeroExterior').markAsPristine();
              this.address.get('numeroExterior').markAsUntouched();
              this.address.get('numeroInterior').setValue('');
              this.address.get('numeroInterior').markAsPristine();
              this.address.get('numeroInterior').markAsUntouched();
              this.address.get('colonia').setValue('');
              this.address.get('colonia').markAsPristine();
              this.address.get('colonia').markAsUntouched();
              this.address.get('codigoPostal').setValue('');
              this.address.get('codigoPostal').markAsPristine();
              this.address.get('codigoPostal').markAsUntouched();
              this._userService.setUser(response.usuario);
              this.addressState = RequestState.success;
            } else {
              this.addressState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.addressState = RequestState.error;
          },
          2000
        );
      });
  }
}
