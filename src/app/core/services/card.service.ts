import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _httpClient: HttpClient) { }

  getCards(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/tarjetas`);
  }
}
