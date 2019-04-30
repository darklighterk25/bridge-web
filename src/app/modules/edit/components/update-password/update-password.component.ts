import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {

  disableBtn = true;
  form: FormGroup;
  title = 'Editar información';

  constructor() {
    this.form = new FormGroup({
      'newPassword': new FormControl(
        '',
        [
          Validators.minLength(8)
        ]
      ),
      'passwordVerification': new FormControl(),
      'password': new FormControl(
        '',
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
  }

  update(): void {
    console.log(JSON.stringify(this.form.value));
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
