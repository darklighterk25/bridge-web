import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {APP_SETTINGS} from '../../configs/app-settings.config';
import {Usuario} from '../../shared/models/usario.model';
import {Observable} from 'rxjs';
import {Direccion} from '../../shared/models/direccion.model';
import {Nombre} from '../../shared/models/nombre.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Usuario;

  constructor(private _httpClient: HttpClient) {
    this.user = TEST_DATA;
  }

  setUser(user: Usuario) {
    this.user = user;
  }

  getUser(): Observable<Object> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/usuario`, APP_SETTINGS.OPTIONS);
  }

  registerUser(user: Usuario): Observable<Object> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/usuario`, user, APP_SETTINGS.OPTIONS);
  }

  updateAddress(address: Direccion): Observable<any> {
    const data = {
      direccion: address
    };
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/usuario`, data, APP_SETTINGS.OPTIONS);
  }

  updateInfo(completeName: Nombre, phone: string): Observable<any> {
    const data = {
      nombreCompleto: completeName,
      telefono: phone
    };
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/usuario`, data, APP_SETTINGS.OPTIONS);
  }

  updatePassword(password: string): Observable<any> {
    const data = {
      contrasena: password
    };
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/usuario`, data, APP_SETTINGS.OPTIONS);
  }

  updatePhoto(datos: any): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/usuario/imagen`, datos);
  }

  updateTheme(theme: string): Observable<any> {
    const data = {
      tema: theme
    };
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/usuario`, data, APP_SETTINGS.OPTIONS);
  }

  deleteUser(): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/usuario`);
  }

}

const TEST_DATA: Usuario = {
  nombreCompleto: {
    nombres: 'Nombres',
    apellido1: 'apellido1',
    apellido2: 'apellido2'
  },
  imagenPerfil: 'data:image/png;base64,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',
  email: 'usuario@correo',
  telefono: '0123456789',
  direccion: {
    calle: 'calle',
    numeroExterior: 123,
    numeroInterior: 'A',
    colonia: 'Colonia',
    codigoPostal: 123456,
  },
  tema: 'default-theme'
};
