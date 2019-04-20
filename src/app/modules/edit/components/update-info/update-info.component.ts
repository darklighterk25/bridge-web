import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html'
})
export class UpdateInfoComponent implements OnInit {

  disableBtn = true;
  form: FormGroup;
  title = 'Editar información';

  constructor() {
    this.form = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.email,
          Validators.required
        ]
      ),
      'phone': new FormControl(
        '',
        [
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.required
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.minLength(8),
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
  }

  update(): void {
    console.log(JSON.stringify(this.form.value));
  }

}
