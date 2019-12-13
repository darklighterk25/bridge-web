import {CardType} from '../enums/card-type.enum';

export interface Tarjeta {
  tipo: number;
  titular: string;
  numero: string;
  fechaVencimiento: string;
  codigo: string;
}
