import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {APP_SETTINGS} from '../../configs/app-settings.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _httpClient: HttpClient) { }

  getComments(id: string): Observable<any> {
    return this._httpClient.get(`${APP_SETTINGS.API_ENDPOINT}/comentarios/${id}`);
  }

  newComment(carId: string, comment: string): Observable<any> {
    const data = {
      auto: carId,
      contenido: comment
    };
    return this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/comentario`, data, APP_SETTINGS.OPTIONS);
  }

  deleteComment(id: string): Observable<any> {
    return this._httpClient.delete(`${APP_SETTINGS.API_ENDPOINT}/comentario/${id}`, APP_SETTINGS.OPTIONS);
  }
}
