import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {Fabricante} from '../../shared/models/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _httpClient: HttpClient) { }

  getBrands(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/marcas`);
  }

  newBrand(data: Fabricante): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/marca`, data, APP_SETTINGS.OPTIONS);
  }

  updateBrand(id: string, data: Fabricante): Observable<any> {
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/marca/${id}`, data, APP_SETTINGS.OPTIONS);
  }

  deleteBrand(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/marca/${id}`, APP_SETTINGS.OPTIONS);
  }
}
