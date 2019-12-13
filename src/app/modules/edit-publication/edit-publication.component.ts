import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {CarService} from '../../core/services/car.service';
import {ModelService} from '../../core/services/model.service';
import {BrandService} from '../../core/services/brand.service';
import {RequestState} from '../../shared/enums/request-state.enum';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html'
})
export class EditPublicationComponent implements OnInit {

  title = 'Editar Publicación';

  disableBtn: boolean;
  selectedFile = null;
  imageState: RequestState;

  marcas: any[];
  modelos: any[];
  id: string;

  currentBrand: string;
  currentModel: string;

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
    this.disableBtn = true;
    this.imageState = RequestState.initial;
    this.id = this.route.snapshot.paramMap.get('_id');
    this._brandService.getBrands().subscribe(
      response => {
        this.marcas = response['marcas'];
      }
    );
    this._carService.getCar(this.id).subscribe(
      response => {
        this.currentBrand = response.auto.modelo.marca['nombre'];
        this.currentModel = response.auto.modelo['nombre'];
        this.auto.setValue({
          modelo:  response.auto['modelo'],
          precio: response.auto['precio'],
          extranjero: response.auto['extranjero'],
          totalDuenos: response.auto['totalDuenos'],
          totalAccidentes: response.auto['totalAccidentes'],
          tipoMotor: response.auto['tipoMotor'],
          transmision:  response.auto['transmision'],
          colorInterior: response.auto['colorInterior'],
          colorExterior: response.auto['colorExterior'],
          kilometraje: response.auto['kilometraje'],
          alarma: response.auto['alarma'],
          aireAcondicionado: response.auto['aireAcondicionado'],
          vidriosElectricos: response.auto['vidriosElectricos'],
          puertasElectricas: response.auto['puertasElectricas'],
          bolsasDeAirePiloto: response.auto['bolsasDeAirePiloto'],
          bolsasDeAirePasajero: response.auto['bolsasDeAirePasajero'],
          bolsasDeAireLaterales: response.auto['bolsasDeAireLaterales'],
          seguroDeNinos: response.auto['seguroDeNinos'],
          controlDeEstabilidad: response.auto['controlDeEstabilidad'],
          bluetooth: response.auto['bluetooth'],
          sensorFrontal: response.auto['sensorFrontal'],
          sensorTrasero: response.auto['sensorTrasero'],
          camaraTrasera: response.auto['camaraTrasera']
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


  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.disableBtn = false;
    console.log(this.selectedFile);
  }

  onUpload(): void {
    this.imageState = RequestState.loading;
    const fd = new FormData();
    fd.append('imagen', this.selectedFile, this.selectedFile.name);
    this._carService.updatePhoto(fd, this.id).subscribe(
      response => {
        if (response.ok) {
          this.imageState = RequestState.success;
        } else {
          this.imageState = RequestState.error;
        }
      },
      error => {
        this.imageState = RequestState.error;
        console.error(error);
      });
  }

  setCurrentBrand(): void {
    this._modelService.getModels(this.currentBrand).subscribe(
      response => {
        this.modelos = response['modelos'];
      }
    );
  }

  submit(): void {
    this._carService.update(this.id).subscribe(
      () => this.router.navigate(['cuenta/publicaciones'])
    );
  }
}
