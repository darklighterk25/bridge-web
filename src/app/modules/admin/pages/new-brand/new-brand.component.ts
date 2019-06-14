import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BrandService} from '../../../../core/services/brand.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: []
})
export class NewBrandComponent implements OnInit {

  title = 'Nueva marca';
  newState: RequestState;
  form: FormGroup;

  constructor(private _router: Router, private _brandService: BrandService) {
    this.form = new FormGroup({
      'name': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'country': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'webPage': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.pattern('[w][w][w][.][-/.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      )
    });
  }

  ngOnInit() {
    this.newState = RequestState.initial;
  }

  new() {
    this.newState = RequestState.loading;
    const data = {
      nombre: this.form.get('name').value,
      pais: this.form.get('country').value,
      paginaWeb: this.form.get('webPage').value !== '' ? this.form.get('webPage').value : null
    };
    this._brandService.newBrand(data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.newState = RequestState.success;
            } else {
              this.newState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.newState = RequestState.error;
          },
          2000
        );
      });
  }

  returnToConfiguration() {
    this._router.navigate(['/administracion/marcas$']);
  }
}
