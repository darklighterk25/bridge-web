import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _httpClient: HttpClient) { }

  isInWishList(id: string): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/wish-list/${id}`);
  }

  getWishListCars(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/wish-list`);
  }

  addCarToWishList(data: any): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/wish-list`, data, APP_SETTINGS.OPTIONS);
  }

  deleteCarFromWishList(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/wish-list/${id}`, APP_SETTINGS.OPTIONS);
  }

  deleteAllCarsFromWishList(): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/wish-list`, APP_SETTINGS.OPTIONS);
  }
}
