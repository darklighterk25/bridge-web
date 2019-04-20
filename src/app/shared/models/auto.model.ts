import {Modelo} from './modelo.model';
import {Usuario} from './usario.model';

export interface Auto {
  modelo: Modelo;
  usuario: Usuario;
  precio: number;
  extranjero: boolean;
  kilometraje: number;
  totalDuenos: number;
  totalAccidentes: number;
  tipoMotor: string;
  transmision: Transmision;
  alarma: boolean;
  aireAcondicionado: boolean;
  colorInterior: string;
  colorExterior: string;
  vidriosElectricos: boolean;
  puertasElectricas: boolean;
  bolsasDeAirePiloto: boolean;
  bolsasDeAirePasajero: boolean;
  bolsasDeAireLaterales: boolean;
  seguroDeNinos: boolean;
  controlDeEstabilidad: boolean;
  bluetooth: boolean;
  sensorFrontal: boolean;
  sensor_trasero: boolean;
  camaraTrasera: boolean;
}

export enum Transmision {
  automatico,
  estandar
}
