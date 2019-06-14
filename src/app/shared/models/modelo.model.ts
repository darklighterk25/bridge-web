import {Fabricante} from './fabricante.model';

export interface Modelo {
  fabricante?: Fabricante;
  marca: string;
  nombre: string;
}
