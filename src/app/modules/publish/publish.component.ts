import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Modelo} from '../../shared/models/modelo.model';

@Component({
  selector: 'app-home',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {

  title = 'Nueva Publicación';

  modelos: Modelo[];

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

  constructor(router: Router) {
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
    this.auto.valueChanges.subscribe(
      () => {
        this.disableBtn = !this.auto.valid;
      }
    );
  }

  ngOnInit(): void {
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
