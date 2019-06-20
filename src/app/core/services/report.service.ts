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

  getDateReport(day: number, month: number, year: number): Observable<any> {
    let request = '/reporte-fecha';
    let params = false;
    if (day != null) {
      request += '?dia=' + day;
      params = true;
    }
    if (month != null) {
      if (!params) {
        request += '?mes=' + month;
        params = true;
      } else {
        request += '&mes=' + month;
      }
    }
    if (year != null) {
      if (!params) {
        request += '?anio=' + year;
      } else {
        request += '&anio=' + year;
      }
    }
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}${request}`);
  }
}
