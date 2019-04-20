import {Direccion} from './direccion.model';
import {Nombre} from './nombre.model';

export interface Usuario {
  nombre: Nombre;
  avatar: string;
  email: string;
  telefono: string;
  direccion: Direccion;
  tema: string;
}
