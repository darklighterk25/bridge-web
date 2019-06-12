import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../core/services/car.service';

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

  brandsState: State;
  modelsState: State;
  carsState: State;
  brands = [];
  models = [];
  constructor(private _carService: CarService) {
    this.searchForm = new FormGroup({
      'brand': new FormControl(''
      ),
      'model': new FormControl({value: '', disabled: true}
      ),
      'price': new FormControl(''
      ),
    });
    this.brandsState = State.initial;
    this.modelsState = State.initial;
    this.carsState = State.initial;
  }

  ngOnInit() {
    this.brandsState = State.loading;
    this._carService.getBrands().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.brands = response.marcas;
              this.brandsState = State.success;
            } else {
              console.log('error');
              this.brandsState = State.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.brandsState = State.falla;
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
    this.searchForm.get('model').setValue('');
    if (this.searchForm.get('brand').value !== '') {
      this.searchForm.get('brand').disable();
      this.searchForm.get('model').enable();
      this.modelsState = State.loading;
      this._carService.getModels(this.searchForm.get('brand').value).subscribe(
        response => {
          setTimeout(
            () => {
              console.log(response);
              this.searchForm.get('brand').enable();
              if (response.ok) {
                this.models = response.modelos;
                this.modelsState = State.success;
              } else {
                this.modelsState = State.error;
              }
            },
            2000
          );
        },
        error => {
          setTimeout(
            () => {
              console.error(error);
              this.searchForm.get('model').disable();
              this.searchForm.get('brand').enable();
              this.modelsState = State.falla;
            },
            2000
          );
        });
    } else {
      this.searchForm.get('model').disable();
      this.modelsState = State.initial;
      this.models = [];
    }
  }

  getCars() {
    this.brandRequired = this.searchForm.get('brand').value;
    this.modelRequired = this.searchForm.get('model').value;
    this.priceRequired = this.getRoundedValue(this.price);
    this.conditionRequired = this.searchForm.get('price').value;
    this.searchForm.get('brand').disable();
    this.searchForm.get('model').disable();
    this.searchForm.get('price').disable();
    this.carsState = State.loading;
    this._carService.getCars(
      this.brandRequired !== '' ? this.brandRequired : null,
      this.modelRequired !== '' ? this.modelRequired : null,
      this.conditionRequired !== '' ? this.priceRequired : null).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            this.searchForm.get('brand').enable();
            this.searchForm.get('model').enable();
            this.searchForm.get('price').enable();
            if (response.ok) {
              this.cars = response.autos;
              this.carsState = State.success;
            } else {
              this.carsState = State.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            // console.error(error);
            this.searchForm.get('brand').enable();
            this.searchForm.get('model').enable();
            this.searchForm.get('price').enable();
            this.carsState = State.falla;
          },
          2000
        );
      });
  }
}

enum State {
  initial,
  loading,
  success,
  error,
  falla
}
