import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {BrandService} from '../../../../core/services/brand.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand-configuration',
  templateUrl: './brand-configuration.component.html',
  styleUrls: []
})
export class BrandConfigurationComponent implements OnInit {

  title = 'Configuración de marcas';
  brandsState: RequestState;
  brands = [];
  form: FormGroup;
  updateState: RequestState;
  deleteState: RequestState;
  deleteBrand: boolean;

  constructor(private _router: Router, private _brandService: BrandService) {
    this.form = new FormGroup({
      'brandIndex': new FormControl({value: '', disabled: this.updateState === RequestState.loading || this.deleteState === RequestState.loading}
      ),
      'name': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'country': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'webPage': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.pattern('[w][w][w][.][-/.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      )
    });
  }

  ngOnInit() {
    this.brandsState = RequestState.initial;
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.deleteBrand = false;
    this.getBrands();
  }

  getBrands() {
    this.brandsState = RequestState.loading;
    this._brandService.getBrands().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.brands = response.marcas;
              this.brandsState = RequestState.success;
            } else {
              console.log('error');
              this.brandsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.brandsState = RequestState.error;
          },
          2000
        );
      });
  }

  reset() {
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.resetFields();
  }

  resetFields() {
    this.form.get('name').setValue('');
    this.form.get('name').markAsPristine();
    this.form.get('name').markAsUntouched();
    this.form.get('country').setValue('');
    this.form.get('country').markAsPristine();
    this.form.get('country').markAsUntouched();
    this.form.get('webPage').setValue('');
    this.form.get('webPage').markAsPristine();
    this.form.get('webPage').markAsUntouched();
  }

  update() {
    this.updateState = RequestState.loading;
    const data = {
      nombre: this.form.get('name').value,
      pais: this.form.get('country').value,
      paginaWeb: this.form.get('webPage').value !== '' ? this.form.get('webPage').value : null
    };
    this._brandService.updateBrand(this.brands[this.form.get('brandIndex').value]._id, data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.brands[this.form.get('brandIndex').value].nombre = this.form.get('name').value;
              this.brands[this.form.get('brandIndex').value].pais = this.form.get('country').value;
              this.brands[this.form.get('brandIndex').value].paginaWeb = this.form.get('webPage').value;
              this.resetFields();
              this.form.get('brandIndex').setValue('');
              this.updateState = RequestState.success;
            } else {
              this.updateState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.updateState = RequestState.error;
          },
          2000
        );
      });
  }

  delete() {
    this.deleteBrand = true;
  }

  new() {
    this._router.navigate(['/administracion/nueva-marca']);
  }

  deleteConfirmation() {
    this.deleteState = RequestState.loading;
    this._brandService.deleteBrand(this.brands[this.form.get('brandIndex').value]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.resetFields();
              this.brands.splice(parseInt(this.form.get('brandIndex').value), 1);
              this.form.get('brandIndex').setValue('');
              this.deleteState = RequestState.success;
              this.deleteBrand = false;
            } else {
              this.deleteState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteState = RequestState.error;
          },
          2000
        );
      });
  }

  deleteCancelation() {
    this.deleteBrand = false;
  }
}
