import {Usuario} from './usario.model';
import {Auto} from './auto.model';
import {Tarjeta} from './tarjeta.model';
import {ProveedorDeEnvio} from './proveedor-de-envio.model';

export interface Compra {
  usuario: Usuario;
  auto: Auto;
  tarjeta: Tarjeta;
  proveedorDeEnvio?: ProveedorDeEnvio;
  total: number;
  iva: number;
  comision: number;
  fecha: Date;
  costoEnvio: number;
}
