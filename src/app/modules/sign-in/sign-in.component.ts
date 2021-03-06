import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  disableBtn: boolean;
  state: number;
  form: FormGroup;
  title = 'Inicio de Sesión';

  constructor(private _authService: AuthenticationService) {
    this.disableBtn = true;
    this.state = State.initial;
    this.form = new FormGroup(
      {
        'email': new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ]
        ),
        'password': new FormControl(
          '',
          Validators.required
        )
      }
    );
    this.form.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.form.valid;
      }
    );
  }

  ngOnInit(): void {
  }

  login(): void {
    this._authService.signIn(this.form.controls['email'].value, this.form.controls['password'].value);
    this.disableBtn = true;
    this.state = State.loading;
    setTimeout(
      () => {
        this.state = State.error;
      },
      2000
    );
  }

}

enum State {
  initial,
  loading,
  error
}
