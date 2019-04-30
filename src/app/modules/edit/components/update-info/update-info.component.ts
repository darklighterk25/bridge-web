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
