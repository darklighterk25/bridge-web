import {Auto} from './auto.model';
import {Comentario} from './comentario.model';

export interface Publicacion {
  auto: Auto;
  comentarios?: Comentario[];
}
