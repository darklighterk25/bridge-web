import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestState} from '../../shared/enums/request-state.enum';
import {CarService} from '../../core/services/car.service';
import {Router} from '@angular/router';
import {ModelService} from '../../core/services/model.service';
import {BrandService} from '../../core/services/brand.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  title = 'Inicio';
  searchForm: FormGroup;
  minimum = 25000;
  maximum = 10000000;
  price = this.minimum;

  imagenes = [
    {
      link: 'assets/home/carrusel1.jpg',
      titulo: '¡Bienvenido!',
      texto: 'Aquí podrás encontrar el carro que deseas.'
    },
    {
      link: 'assets/home/carrusel2.jpeg',
      titulo: '¿Aún no tienes vehículo?',
      texto: 'Da un vistazo a los vehículos que te ofrecemos.'
    },
    {
      link: 'assets/home/carrusel3.jpg',
      titulo: '¡Registrate!',
      texto: 'Realiza tu registro para poder vender o comprar vehículos.'
    },
    {
      link: 'assets/home/carrusel4.jpg',
      titulo: '¡Contamos con variedad!',
      texto: 'Te proporcionamos vehículos de gran variedad de las marcas del mercado.'
    }
  ];
  carsState: RequestState;
  modelsState: RequestState;
  brandsState: RequestState;
  brands = [];
  models = [];
  cars = [];

  constructor(config: NgbCarouselConfig,
              private _carService: CarService,
              private _router: Router,
              private _modelService: ModelService,
              private _brandService: BrandService) {
    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    this.searchForm = new FormGroup({
      'brandIndex': new FormControl(''
      ),
      'modelIndex': new FormControl({value: '', disabled: true}
      ),
      'price': new FormControl(''
      ),
    });
  }

  ngOnInit() {
    this.modelsState = RequestState.initial;
    this.carsState = RequestState.loading;
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
            this.brandsState = RequestState.error;
          },
          2000
        );
      });
    this._carService.getCars(null, null, null, 6).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
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
            this.carsState = RequestState.error;
          },
          2000
        );
      });
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

  formatLabel(value: number | null) {
    return Math.round(value / 1000) + 'k';
  }

  getRoundedValue(value: number | null) {
    return Math.round(value / 1000) * 1000;
  }

  getCars() {
    this._router.navigate(
      ['/catalogo',
        {
          marca: this.searchForm.get('brandIndex').value,
          modelo: this.searchForm.get('modelIndex').value,
          condicion: this.searchForm.get('price').value,
          precio: this.searchForm.get('price').value === '' ? '' : this.price
        }]);
  }
}
