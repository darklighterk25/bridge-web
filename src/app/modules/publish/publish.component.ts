import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {BrandService} from '../../core/services/brand.service';
import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';
import {RequestState} from '../../shared/enums/request-state.enum';

@Component({
  selector: 'app-home',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {

  title = 'Nueva Publicación';
  newState: RequestState;
  brandsState: RequestState;
  modelsState: RequestState;

  marcas: any[];
  modelos: any[];

  currentBrand: string;
  currentModel: string;

  disableBtn: boolean;
  auto: FormGroup;
  extranjero: boolean;
  alarma: boolean;
  aireAcondicionado: boolean;
  vidriosElectricos: boolean;
  puertasElectricas: boolean;
  bolsasDeAirePiloto: boolean;
  bolsasDeAirePasajero: boolean;
  bolsasDeAireLaterales: boolean;
  seguroDeNinos: boolean;
  controlDeEstabilidad: boolean;
  bluetooth: boolean;
  sensorFrontal: boolean;
  sensorTrasero: boolean;
  camaraTrasera: boolean;

  constructor(private router: Router,
              private _brandService: BrandService,
              private _carService: CarService,
              private _modelService: ModelService) {
    this.disableBtn = true;
    this.extranjero = false;
    this.alarma = false;
    this.aireAcondicionado = false;
    this.vidriosElectricos = false;
    this.puertasElectricas = false;
    this.bolsasDeAirePiloto = false;
    this.bolsasDeAirePasajero = false;
    this.bolsasDeAireLaterales = false;
    this.seguroDeNinos = false;
    this.controlDeEstabilidad = false;
    this.bluetooth = false;
    this.sensorFrontal = false;
    this.sensorTrasero = false;
    this.camaraTrasera = false;
    this.auto = new FormGroup({
      'modelo': new FormControl({value: '', disabled: this.modelsState !== 2}),
      'precio': new FormControl(0, [Validators.required]),
      'extranjero': new FormControl(this.extranjero),
      'kilometraje': new FormControl(0, [Validators.required]),
      'totalDuenos': new FormControl(1, [Validators.required]),
      'totalAccidentes': new FormControl(0, [Validators.required]),
      'tipoMotor': new FormControl('Gasolina', [Validators.required]),
      'transmision': new FormControl(0, [Validators.required]),
      'alarma': new FormControl(this.alarma),
      'aireAcondicionado': new FormControl(this.aireAcondicionado),
      'colorInterior': new FormControl('', [Validators.required]),
      'colorExterior': new FormControl('', [Validators.required]),
      'vidriosElectricos': new FormControl(this.vidriosElectricos),
      'puertasElectricas': new FormControl(this.puertasElectricas),
      'bolsasDeAirePiloto': new FormControl(this.bolsasDeAirePiloto),
      'bolsasDeAirePasajero': new FormControl(this.bolsasDeAirePasajero),
      'bolsasDeAireLaterales': new FormControl(this.bolsasDeAireLaterales),
      'seguroDeNinos': new FormControl(this.seguroDeNinos),
      'controlDeEstabilidad': new FormControl(this.controlDeEstabilidad),
      'bluetooth': new FormControl(this.bluetooth),
      'sensorFrontal': new FormControl(this.sensorFrontal),
      'sensorTrasero': new FormControl(this.sensorTrasero),
      'camaraTrasera': new FormControl(this.camaraTrasera),
    });
  }

  ngOnInit(): void {
    this.auto.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.auto.valid;
      }
    );
    this.newState = RequestState.initial;
    this.modelsState = RequestState.initial;
    this.brandsState = RequestState.loading;
    this._brandService.getBrands().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.marcas = response.marcas;
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

  setCurrentBrand(): void {
    console.log(this.currentBrand);
    if (this.currentBrand !== '') {
      this.modelsState = RequestState.loading;
      this._modelService.getModels(this.currentBrand).subscribe(
        response => {
          setTimeout(
            () => {
              console.log(response);
              if (response.ok) {
                this.auto.get('modelo').enable();
                this.modelos = response.modelos;
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
              this.modelos = [];
              this.modelsState = RequestState.error;
            },
            2000
          );
        });
    } else {
      this.auto.get('modelo').disable();
      this.modelsState = RequestState.initial;
      this.modelos = [];
    }
  }

  submit(): void {
    this.disableBtn = true;
    this.auto.patchValue({
      modelo: this.currentModel,
      extranjero: this.extranjero,
      alarma: this.alarma,
      aireAcondicionado: this.aireAcondicionado,
      vidriosElectricos: this.vidriosElectricos,
      puertasElectricas: this.puertasElectricas,
      bolsasDeAirePiloto: this.bolsasDeAirePiloto,
      bolsasDeAirePasajero: this.bolsasDeAirePasajero,
      bolsasDeAireLaterales: this.bolsasDeAireLaterales,
      seguroDeNinos: this.seguroDeNinos,
      controlDeEstabilidad: this.controlDeEstabilidad,
      bluetooth: this.bluetooth,
      sensorFrontal: this.sensorFrontal,
      sensorTrasero: this.sensorTrasero,
      camaraTrasera: this.camaraTrasera
    });
    this.newState = RequestState.loading;
    this._carService.newCar(this.auto.value).subscribe(
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

  returnToPublications() {
    this.router.navigate(['/cuenta/publicaciones']);

  }
}
