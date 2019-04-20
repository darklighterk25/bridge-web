import {Fabricante} from './fabricante.model';

export interface Modelo {
  fabricante: Fabricante;
  nombre: string;
  ano: string;
  serie: string;
}
