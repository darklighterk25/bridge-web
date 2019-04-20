import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  disableBtn = true;
  form: FormGroup;
  title = 'Registro';

  constructor() {
    this.form = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ),
      'passwordVerification': new FormControl(),
      'agreement': new FormControl(
        false,
        [
          Validators.required,
          Validators.pattern('true')
        ]
      ),
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
  }

  notEqual(control: FormControl): { [str: string]: boolean } {
    const form: any = this; // Cambio de contexto.
    if (control.value !== form.controls['password'].value) {
      return {
        notEqual: true
      };
    }
    return null;
  }

  signUp(): void {
    console.log(JSON.stringify(this.form.value));
  }
}
