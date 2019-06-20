import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModelService} from '../../../../core/services/model.service';
import {BrandService} from '../../../../core/services/brand.service';

@Component({
  selector: 'app-new-model',
  templateUrl: './new-model.component.html',
  styleUrls: []
})
export class NewModelComponent implements OnInit {

  title = 'Nuevo modelo';
  newState: RequestState;
  form: FormGroup;
  brandsState: RequestState;
  brands = [];

  constructor(private _router: Router, private _modelService: ModelService, private _brandService: BrandService) {
    this.form = new FormGroup({
      'brandIndex': new FormControl('',
        [
          Validators.required
        ]
      ),
      'name': new FormControl('',
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      )
    });
  }

  ngOnInit() {
    this.newState = RequestState.initial;
    this.brandsState = RequestState.initial;
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
              this.brandsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.brandsState = RequestState.error;
          },
          2000
        );
      });
  }

  new() {
    this.newState = RequestState.loading;
    const data = {
      marca: this.brands[parseInt(this.form.get('brandIndex').value)]._id,
      nombre: this.form.get('name').value
    };
    this._modelService.newModel(data).subscribe(
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
            console.error(error);
            this.newState = RequestState.error;
          },
          2000
        );
      });
  }

  returnToConfiguration() {
    this._router.navigate(['/administracion/modelos']);
  }
}
