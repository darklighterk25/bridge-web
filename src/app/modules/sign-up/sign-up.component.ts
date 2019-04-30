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
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'lastName1': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'lastName2': new FormControl(
        '',
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
          '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
      ),
      'phone': new FormControl(
        '',
        [
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.required
        ]
      ),
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
