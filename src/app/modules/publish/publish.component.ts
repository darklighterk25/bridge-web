import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {BrandService} from '../../core/services/brand.service';
import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';

@Component({
  selector: 'app-home',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {

  title = 'Nueva Publicación';

  marcas$: any[];
  modelos$: any[];

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
      'modelo':  new FormControl(''),
      'precio': new FormControl(0, [Validators.required]),
      'extranjero': new FormControl(this.extranjero),
      'kilometraje':  new FormControl(0, [Validators.required]),
      'totalDuenos': new FormControl(1, [Validators.required]),
      'totalAccidentes':  new FormControl(0, [Validators.required]),
      'tipoMotor':  new FormControl('Gasolina', [Validators.required]),
      'transmision':  new FormControl(0, [Validators.required]),
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
    this._brandService.getBrands().subscribe(
      response => {
        this.marcas$ = response['marcas'];
      }
    );
  }

  setCurrentBrand(): void {
    console.log(this.currentBrand);
    this._modelService.getModels(this.currentBrand).subscribe(
      response => {
        this.modelos$ = response['modelos'];
      }
    );
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
    this._carService.newCar(this.auto.value).subscribe(
      () => {
        this.router.navigate(['/cuenta/publicaciones']);
      },
      error => console.error(error)
    );
    console.log(this.auto.value);
  }
}
