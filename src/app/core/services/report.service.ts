import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpClient: HttpClient) { }

  getBrandReport(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/reporte-marcas`);
  }

  getModelReport(): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/reporte-modelos`);
  }
}
