import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _httpClient: HttpClient) {
  }

  getBrands(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/marcas`);
  }

  getModels(brand: string): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/modelos/${brand}`);
  }

  getCars(brand: string, model: string, price: number): Observable<any> {
    let request = '/autos';
    let params = false;
    if (brand != null) {
      request += '?marca=' + brand;
      params = true;
    }
    if (model != null) {
      if (params) {
        request += '?modelo=' + model;
      } else {
        request += '&modelo=' + model;
        params = true;
      }
    }
    if (price != null) {
      if (params) {
        request += '?precio=' + price;
      } else {
        request += '&precio=' + price;
      }
    }
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}${request}`);
  }
}
