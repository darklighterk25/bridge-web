import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {Modelo} from '../../shared/models/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private _httpClient: HttpClient) { }

  getModels(model: string): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/modelos/${model}`);
  }

  newModel(data: Modelo): Observable<any> {
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/modelo`, data, APP_SETTINGS.OPTIONS);
  }

  updateModel(id: string, data: Modelo): Observable<any> {
    return this._httpClient.put(`${APP_SETTINGS.API_ENDPOINT}/modelo/${id}`, data, APP_SETTINGS.OPTIONS);
  }

  deleteModel(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/modelo/${id}`, APP_SETTINGS.OPTIONS);
  }
}
