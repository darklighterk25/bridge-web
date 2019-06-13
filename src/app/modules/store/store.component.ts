import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';
import {BrandService} from '../../core/services/brand.service';
import {RequestState} from '../../shared/enums/request-state.enum';

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
  /*vehiculos = [
    {
      id: 1,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    },
    {
      id: 2,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    },
    {
      id: 3,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    },
    {
      id: 4,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    }
  ];*/

  brandsState: RequestState;
  modelsState: RequestState;
  carsState: RequestState;
  brands = [];
  models = [];
  constructor(private _carService: CarService, private _modelService: ModelService, private _brandService: BrandService) {
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

  formatLabel(value: number | null) {
    return Math.round(value / 1000) + 'k';
  }

  getRoundedValue(value: number | null) {
    return Math.round(value / 1000) * 1000;
  }

  getModels() {
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
              this.searchForm.get('modelIndex').disable();
              this.searchForm.get('brandIndex').enable();
              this.modelsState = RequestState.error;
            },
            2000
          );
        });
    } else {
      this.searchForm.get('modelIndex').disable();
      this.modelsState = RequestState.initial;
      this.models = [];
    }
  }

  getCars() {
    this.brandRequired = this.brands[parseInt(this.searchForm.get('brandIndex').value)]._id;
    this.modelRequired = this.models[parseInt(this.searchForm.get('modelIndex').value)]._id;
    this.priceRequired = this.getRoundedValue(this.price);
    this.conditionRequired = this.searchForm.get('price').value;
    this.searchForm.get('brandIndex').disable();
    this.searchForm.get('modelIndex').disable();
    this.searchForm.get('price').disable();
    this.carsState = RequestState.loading;
    this._carService.getCars(
      this.brandRequired !== '' ? this.brandRequired : null,
      this.modelRequired !== '' ? this.modelRequired : null,
      this.conditionRequired !== '' ? this.priceRequired : null).subscribe(
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
}
