import {Pipe, PipeTransform} from '@angular/core';

import {Nombre} from '../models/nombre.model';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  fullName: string;

  transform(value: Nombre, args?: any): string {
    this.fullName = value.nombres + ' ' + value.apellido1;
    if (value.apellido2) {
      this.fullName += ' ' + value.apellido2;
    }
    return this.fullName;
  }
}
