import {Direccion} from './direccion.model';
import {Nombre} from './nombre.model';

export interface Usuario {
  nombreCompleto: Nombre;
  avatar?: string;
  email: string;
  telefono: string;
  direccion: Direccion;
  tema: string;
  contrasena?: string;
}
