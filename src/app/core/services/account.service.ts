import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _httpClient: HttpClient) { }

  getCars(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/cuenta/autos`);
  }
}
