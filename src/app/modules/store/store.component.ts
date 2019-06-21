import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';
import {BrandService} from '../../core/services/brand.service';
import {RequestState} from '../../shared/enums/request-state.enum';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {

  title = 'Catálogo';
  searchForm: FormGroup;
  minimum = 25000;
  maximum = 2000000;
  price = this.minimum;
  modelRequired = null;
  brandRequired = null;
  priceRequired = null;
  conditionRequired = null;
  cars = [];

  brandsState: RequestState;
  modelsState: RequestState;
  carsState: RequestState;
  brands = [];
  models = [];
  constructor(private _carService: CarService, private _modelService: ModelService, private _brandService: BrandService, private route: ActivatedRoute) {
    this.searchForm = new FormGroup({
      'brandIndex': new FormControl(''
      ),
      'modelIndex': new FormControl({value: '', disabled: true}
      ),
      'price': new FormControl(''
      ),
    });
    this.brandsState = RequestState.initial;
    this.modelsState = RequestState.initial;
    this.carsState = RequestState.initial;
  }

  ngOnInit() {
    this.brandsState = RequestState.loading;
    this._brandService.getBrands().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.brands = response.marcas;
              if (this.route.snapshot.paramMap.get('marca') !== null) {
                if (this.route.snapshot.paramMap.get('condicion') === 'Menor o igual'
                    && !isNaN(parseInt(this.route.snapshot.paramMap.get('precio')))
                    && parseInt(this.route.snapshot.paramMap.get('precio')) >= this.minimum
                    && parseInt(this.route.snapshot.paramMap.get('precio')) < this.maximum) {
                  this.searchForm.get('price').setValue(this.route.snapshot.paramMap.get('condicion'));
                  this.price = parseInt(this.route.snapshot.paramMap.get('precio'));
                }
                if (!isNaN(parseInt(this.route.snapshot.paramMap.get('marca')))
                    && parseInt(this.route.snapshot.paramMap.get('marca')) >= 0
                    && parseInt(this.route.snapshot.paramMap.get('marca')) < this.brands.length) {
                  this.searchForm.get('brandIndex').setValue(this.route.snapshot.paramMap.get('marca'));
                  this.getModels(true);
                } else {
                  this.getCars();
                  this.brandsState = RequestState.success;
                }
              } else {
                this.brandsState = RequestState.success;
              }
            } else {
              this.brandsState = RequestState.error;
            }
          },
          this.route.snapshot.paramMap.get('marca') !== null ? 0 : 2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.brandsState = RequestState.error;
          },
          this.route.snapshot.paramMap.get('marca') !== null ? 0 : 2000
        );
      });
  }

  formatLabel(value: number | null) {
    return Math.round(value / 1000) + 'k';
  }

  getRoundedValue(value: number | null) {
    return Math.round(value / 1000) * 1000;
  }

  getModels(homeRequest: boolean) {
    this.searchForm.get('modelIndex').setValue('');
    if (this.searchForm.get('brandIndex').value !== '') {
      this.searchForm.get('brandIndex').disable();
      this.searchForm.get('modelIndex').enable();
      this.modelsState = RequestState.loading;
      this._modelService.getModels(this.brands[parseInt(this.searchForm.get('brandIndex').value)]._id).subscribe(
        response => {
          setTimeout(
            () => {
              console.log(response);
              this.searchForm.get('brandIndex').enable();
              if (response.ok) {
                this.models = response.modelos;
                this.modelsState = RequestState.success;
                if (homeRequest) {
                  if (!isNaN(parseInt(this.route.snapshot.paramMap.get('modelo')))
                      && parseInt(this.route.snapshot.paramMap.get('modelo')) >= 0
                      && parseInt(this.route.snapshot.paramMap.get('modelo')) < this.brands.length) {
                    this.searchForm.get('modelIndex').setValue(this.route.snapshot.paramMap.get('modelo'));
                  }
                  this.brandsState = RequestState.success;
                  this.getCars();
                }
              } else {
                this.modelsState = RequestState.error;
              }
            },
            homeRequest ? 0 : 200
          );
        },
        error => {
          setTimeout(
            () => {
              console.error(error);
              this.searchForm.get('modelIndex').disable();
              this.searchForm.get('brandIndex').enable();
              this.modelsState = RequestState.error;
            },
            homeRequest ? 0 : 200
          );
        });
    } else {
      this.searchForm.get('modelIndex').disable();
      this.modelsState = RequestState.initial;
      this.models = [];
    }
  }

  getCars() {
    this.brandRequired = this.searchForm.get('brandIndex').value;
    this.modelRequired = this.searchForm.get('modelIndex').value;
    this.priceRequired = this.getRoundedValue(this.price);
    this.conditionRequired = this.searchForm.get('price').value;
    this.searchForm.get('brandIndex').disable();
    this.searchForm.get('modelIndex').disable();
    this.searchForm.get('price').disable();
    this.carsState = RequestState.loading;
    this._carService.getCars(
      this.brandRequired !== '' ? this.brands[parseInt(this.brandRequired)]._id : null,
      this.modelRequired !== '' ? this.models[parseInt(this.modelRequired)]._id : null,
      this.conditionRequired !== '' ? this.priceRequired : null,
      null).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            this.searchForm.get('brandIndex').enable();
            this.searchForm.get('modelIndex').enable();
            this.searchForm.get('price').enable();
            if (response.ok) {
              this.cars = response.autos;
              this.carsState = RequestState.success;
            } else {
              this.carsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            // console.error(error);
            this.searchForm.get('brandIndex').enable();
            this.searchForm.get('modelIndex').enable();
            this.searchForm.get('price').enable();
            this.carsState = RequestState.error;
          },
          2000
        );
      });
  }

  changeFilters(filter: number) {
    switch (filter) {
      case 1: this.searchForm.get('modelIndex').setValue('');
              this.searchForm.get('price').setValue('');
              this.price = 25000;
              break;
      case 2: this.searchForm.get('price').setValue('');
              this.price = 25000;
              break;
    }
    this.getCars();
  }
}
