import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit {

  disableBtn = true;
  form: FormGroup;
  title = 'Actualizar información';
  infoState: RequestState;

  constructor(private _userService: UserService) {
    this.form = new FormGroup({
      'name': new FormControl(
        {value: '', disabled: this.infoState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'lastName1': new FormControl(
        {value: '', disabled: this.infoState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'lastName2': new FormControl(
        {value: '', disabled: this.infoState === RequestState.loading},
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
          '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
      ),
      'phone': new FormControl(
        {value: '', disabled: this.infoState === RequestState.loading},
        [
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.required
        ]
      )
    });
    // Habilita el botón cuando el formulario es válido.
    this.form.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.form.valid;
      }
    );
  }

  ngOnInit(): void {
    this.infoState = RequestState.initial;
  }

  update(): void {
    const completeName = {
      nombres: this.form.get('name').value,
      apellido1: this.form.get('lastName1').value,
      apellido2: this.form.get('lastName2').value
    };
    const phone = this.form.get('phone').value;
    this.infoState = RequestState.loading;
    this._userService.updateInfo(completeName, phone).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.form.get('name').setValue('');
              this.form.get('name').markAsPristine();
              this.form.get('name').markAsUntouched();
              this.form.get('lastName1').setValue('');
              this.form.get('lastName1').markAsPristine();
              this.form.get('lastName1').markAsUntouched();
              this.form.get('lastName2').setValue('');
              this.form.get('lastName2').markAsPristine();
              this.form.get('lastName2').markAsUntouched();
              this.form.get('phone').setValue('');
              this.form.get('phone').markAsPristine();
              this.form.get('phone').markAsUntouched();
              this._userService.setUser(response.usuario);
              this.infoState = RequestState.success;
            } else {
              this.infoState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.infoState = RequestState.error;
          },
          2000
        );
      });
  }

}
