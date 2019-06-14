import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BrandService} from '../../../../core/services/brand.service';
import {ModelService} from '../../../../core/services/model.service';

@Component({
  selector: 'app-model-configuration',
  templateUrl: './model-configuration.component.html',
  styleUrls: []
})
export class ModelConfigurationComponent implements OnInit {

  title = 'Configuración de modelos$';
  brandsState: RequestState;
  brands = [];
  modelsState: RequestState;
  models = [];
  form: FormGroup;
  updateState: RequestState;
  deleteState: RequestState;
  deleteModel: boolean;

  constructor(private _router: Router, private _modelService: ModelService, private _brandService: BrandService) {
    this.form = new FormGroup({
      'brandIndex': new FormControl(
        {value: '', disabled: this.updateState === RequestState.loading || this.deleteState === RequestState.loading}
      ),
      'modelIndex': new FormControl(
        {value: '', disabled: this.updateState === RequestState.loading || this.deleteState === RequestState.loading || this.modelsState !== 2}
      ),
      'name': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'newBrandIndex': new FormControl(
        {value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required
        ]
      ),
    });
  }

  ngOnInit() {
    this.brandsState = RequestState.initial;
    this.modelsState = RequestState.initial;
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.deleteModel = false;
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
              this.brands = response.marcas$;
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
            this.brandsState = RequestState.error;
          },
          2000
        );
      });
  }

  getModels() {
    if (this.form.get('brandIndex').value !== '') {
      this.form.get('brandIndex').disable();
      this.form.get('modelIndex').enable();
      this.modelsState = RequestState.loading;
      this._modelService.getModels(this.brands[this.form.get('brandIndex').value]._id).subscribe(
        response => {
          setTimeout(
            () => {
              console.log(response);
              this.form.get('brandIndex').enable();
              if (response.ok) {
                this.models = response.modelos$;
                this.modelsState = RequestState.success;
              } else {
                this.modelsState = RequestState.error;
              }
            },
            2000
          );
        },
        error => {
          setTimeout(
            () => {
              console.error(error);
              this.form.get('modelIndex').disable();
              this.form.get('brandIndex').enable();
              this.models = [];
              this.modelsState = RequestState.error;
            },
            2000
          );
        });
    } else {
      this.form.get('modelIndex').disable();
      this.modelsState = RequestState.initial;
      this.models = [];
    }
  }

  reset() {
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.resetForBrands();
    this.getModels();
  }

  resetForBrands() {
    this.form.get('modelIndex').setValue('');
    this.resetForModels();
  }

  resetForModels() {
    this.form.get('name').setValue('');
    this.form.get('name').markAsPristine();
    this.form.get('name').markAsUntouched();
    this.form.get('newBrandIndex').setValue('');
    this.form.get('newBrandIndex').markAsPristine();
    this.form.get('newBrandIndex').markAsUntouched();
  }

  update() {
    this.updateState = RequestState.loading;
    const data = {
      marca: this.brands[this.form.get('newBrandIndex').value]._id,
      nombre: this.form.get('name').value
    };
    this._modelService.updateModel(this.models[this.form.get('modelIndex').value]._id, data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.models[this.form.get('modelIndex').value].marca = this.brands[this.form.get('newBrandIndex').value]._id;
              this.models[this.form.get('modelIndex').value].nombre = this.form.get('name').value;
              this.resetForBrands();
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
    this.deleteModel = true;
  }

  new() {
    this._router.navigate(['/administracion/nuevo-modelo']);
  }

  deleteConfirmation() {
    this.deleteState = RequestState.loading;
    this._modelService.deleteModel(this.models[parseInt(this.form.get('modelIndex').value)]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.resetForBrands();
              this.models.splice(parseInt(this.form.get('modelIndex').value), 1);
              this.form.get('modelIndex').setValue('');
              this.deleteState = RequestState.success;
              this.deleteModel = false;
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
    this.deleteModel = false;
  }
}
