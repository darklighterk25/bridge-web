import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';
import {BrandService} from '../../core/services/brand.service';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html'
})
export class EditPublicationComponent implements OnInit {

  title = 'Editar Publicación';

  marcas$: any[];
  modelos$: any[];
  id: string;

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

  constructor(private route: ActivatedRoute,
              private router: Router,
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
      'modelo':  new FormControl('', [Validators.required]),
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.auto.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.auto.valid;
      }
    );
    this._brandService.getBrands().subscribe(
      response => {
        this.marcas$ = response['marcas$'];
        console.log(this.marcas$);
      }
    );
    this._carService.getCar(this.id).subscribe(
      response => {
        this.currentBrand = response['marca'];
        this.currentModel = response['modelo'];
        this.auto = new FormGroup({
          'modelo':  new FormControl(response['modelo'], [Validators.required]),
          'precio': new FormControl(response['precio'], [Validators.required]),
          'extranjero': new FormControl(response['extranjero']),
          'kilometraje':  new FormControl(response['kilometraje'], [Validators.required]),
          'totalDuenos': new FormControl(response['totalDuenos'], [Validators.required]),
          'totalAccidentes':  new FormControl(response['totalAccidentes'], [Validators.required]),
          'tipoMotor':  new FormControl(response['tipoMotor'], [Validators.required]),
          'transmision':  new FormControl(response['transmision'], [Validators.required]),
          'alarma': new FormControl(response['alarma']),
          'aireAcondicionado': new FormControl(response['aireAcondicionado']),
          'colorInterior': new FormControl(response['colorInterior'], [Validators.required]),
          'colorExterior': new FormControl(response['colorExterior'], [Validators.required]),
          'vidriosElectricos': new FormControl(response['vidriosElectricos']),
          'puertasElectricas': new FormControl(response['puertasElectricas']),
          'bolsasDeAirePiloto': new FormControl(response['bolsasDeAirePiloto']),
          'bolsasDeAirePasajero': new FormControl(response['bolsasDeAirePasajero']),
          'bolsasDeAireLaterales': new FormControl(response['bolsasDeAireLaterales']),
          'seguroDeNinos': new FormControl(response['seguroDeNinos']),
          'controlDeEstabilidad': new FormControl(response['controlDeEstabilidad']),
          'bluetooth': new FormControl(response['bluetooth']),
          'sensorFrontal': new FormControl(response['sensorFrontal']),
          'sensorTrasero': new FormControl(response['sensorTrasero']),
          'camaraTrasera': new FormControl(response['camaraTrasera']),
        });
      },
      () => {
        this.auto = new FormGroup({
          'modelo':  new FormControl('', [Validators.required]),
          'precio': new FormControl(0, [Validators.required]),
          'extranjero': new FormControl(false),
          'kilometraje':  new FormControl(0, [Validators.required]),
          'totalDuenos': new FormControl(1, [Validators.required]),
          'totalAccidentes':  new FormControl(0, [Validators.required]),
          'tipoMotor':  new FormControl('Gasolina', [Validators.required]),
          'transmision':  new FormControl(0, [Validators.required]),
          'alarma': new FormControl(false),
          'aireAcondicionado': new FormControl(false),
          'colorInterior': new FormControl('', [Validators.required]),
          'colorExterior': new FormControl('', [Validators.required]),
          'vidriosElectricos': new FormControl(false),
          'puertasElectricas': new FormControl(false),
          'bolsasDeAirePiloto': new FormControl(false),
          'bolsasDeAirePasajero': new FormControl(false),
          'bolsasDeAireLaterales': new FormControl(false),
          'seguroDeNinos': new FormControl(false),
          'controlDeEstabilidad': new FormControl(false),
          'bluetooth': new FormControl(false),
          'sensorFrontal': new FormControl(false),
          'sensorTrasero': new FormControl(false),
          'camaraTrasera': new FormControl(false),
        });
      }
    );
  }

  setCurrentBrand(): void {
    console.log(this.currentBrand);
    this._modelService.getModels(this.currentBrand).subscribe(
      response => {
        this.modelos$ = response['modelos$'];
        console.log(this.modelos$);
      }
    );
  }

  submit(): void {
    this.auto.patchValue({
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
    console.log(this.auto);
  }
}
