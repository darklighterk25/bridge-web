import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private _httpClient: HttpClient) { }

  getPurchase(id: string): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/compra/${id}`);
  }

  getPurchases(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/compras`);
  }

  addPurchase(data: any): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/compra`, data, APP_SETTINGS.OPTIONS);
  }
}
