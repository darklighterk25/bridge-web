import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {Fabricante} from '../../shared/models/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private _httpClient: HttpClient) { }

  getProviders(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/proveedores-de-envio`);
  }

  newProvider(data: any): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/proveedor-de-envio`, data, APP_SETTINGS.OPTIONS);
  }

  updateProvider(id: string, data: any): Observable<any> {
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/proveedor-de-envio/${id}`, data, APP_SETTINGS.OPTIONS);
  }

  deleteProvider(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/proveedor-de-envio/${id}`, APP_SETTINGS.OPTIONS);
  }
}
