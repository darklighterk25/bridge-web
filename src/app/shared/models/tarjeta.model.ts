import {CardType} from '../enums/card-type.enum';

export interface Tarjeta {
  tipo: CardType;
  titular: string;
  numero: string;
  fechaVencimiento: string;
  codigo: string;
}
