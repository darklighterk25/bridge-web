import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {

  disableBtn = true;
  form: FormGroup;
  title = 'Cambiar contraseña';
  passwordState: RequestState;

  constructor(private _userService: UserService) {
    this.form = new FormGroup({
      'newPassword': new FormControl(
        {value: '', disabled: this.passwordState === RequestState.loading},
        [
          Validators.minLength(8)
        ]
      ),
      'passwordVerification': new FormControl(),
      'password': new FormControl(
        {value: '', disabled: this.passwordState === RequestState.loading},
        [
          Validators.minLength(8),
          Validators.required
        ]
      )
    });
    // Verificación de contraseña.
    this.form.controls['passwordVerification'].setValidators([
      Validators.required,
      this.notEqual.bind(this.form)
    ]);
    // Habilita el botón cuando el formulario es válido.
    this.form.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.form.valid;
      }
    );
  }

  ngOnInit(): void {
    this.passwordState = RequestState.initial;
  }

  update(): void {
    this.passwordState = RequestState.loading;
    this._userService.updatePassword(this.form.get('newPassword').value).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.form.get('newPassword').setValue('');
              this.form.get('newPassword').markAsPristine();
              this.form.get('newPassword').markAsUntouched();
              this.form.get('passwordVerification').setValue('');
              this.form.get('passwordVerification').markAsPristine();
              this.form.get('passwordVerification').markAsUntouched();
              this.form.get('password').setValue('');
              this.form.get('password').markAsPristine();
              this.form.get('password').markAsUntouched();
              this.passwordState = RequestState.success;
            } else {
              this.passwordState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.passwordState = RequestState.error;
          },
          2000
        );
      });
  }

  notEqual(control: FormControl): { [str: string]: boolean } {
    const form: any = this; // Cambio de contexto.
    if (control.value !== form.controls['newPassword'].value) {
      return {
        notEqual: true
      };
    }
    return null;
  }
}
