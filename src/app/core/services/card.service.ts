import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {HttpClient} from '@angular/common/http';
import {Tarjeta} from '../../shared/models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _httpClient: HttpClient) { }

  getCards(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/tarjetas`);
  }

  newCard(data: Tarjeta): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/tarjeta`, data, APP_SETTINGS.OPTIONS);
  }

  deleteCard(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/tarjeta/${id}`, APP_SETTINGS.OPTIONS);
  }
}
