import {Injectable} from '@angular/core';

import {Usuario} from '../../shared/models/usario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Usuario;

  constructor() {
    this.user = TEST_DATA;
  }

  getUser(): Usuario {
    return this.user;
  }
}

const TEST_DATA: Usuario = {
  nombre: {
    nombres: 'Nombres',
    apellido1: 'apellido1',
    apellido2: 'apellido2'
  },
  avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  email: 'usuario@correo',
  telefono: '0123456789',
  direccion: {
    calle: 'calle',
    numero: 123,
    numeroInterior: 'A',
    colonia: 'Colonia',
    codigoPostal: 123456,
    municipio: 'Municipio',
    estado: 'Estado'
  },
  tema: 'default-theme'
};
