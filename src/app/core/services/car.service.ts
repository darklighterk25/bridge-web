import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {Fabricante} from '../../shared/models/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _httpClient: HttpClient) {
  }

  getCar(id: any): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/auto/${id}`, APP_SETTINGS.OPTIONS);
  }

  getCars(brand: string, model: string, price: number, quantity: number): Observable<any> {
    let request = '/autos';
    let params = false;
    if (brand != null) {
      request += '?marca=' + brand;
      params = true;
    }
    if (model != null) {
      if (!params) {
        request += '?modelo=' + model;
        params = true;
      } else {
        request += '&modelo=' + model;
      }
    }
    if (price != null) {
      if (!params) {
        request += '?precio=' + price;
        params = true;
      } else {
        request += '&precio=' + price;
      }
    }
    if (quantity != null) {
      if (!params) {
        request += '?cantidad=' + quantity;
      } else {
        request += '&cantidad=' + quantity;
      }
    }
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}${request}`);
  }

  newCar(data: any): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/auto`, data, APP_SETTINGS.OPTIONS);
  }
}
