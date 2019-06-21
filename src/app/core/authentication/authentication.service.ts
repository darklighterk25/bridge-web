import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {APP_SETTINGS} from '../../configs/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private admin = new BehaviorSubject<boolean>(false);
  private theme = new BehaviorSubject<string>('default-theme');
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userId: string;

  get isAdmin() {
    return this.admin.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userTheme() {
    return this.theme.asObservable();
  }

  constructor(private _router: Router,
              private _httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  signIn(email: string, password: string): void {
    this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/login`, {email: email, contrasena: password}, APP_SETTINGS.OPTIONS).subscribe(
      response => {
        console.log(response);
        this.userId = response['usuario']._id;
        this.admin.next(response['usuario'].isAdmin);
        this.theme.next(response['usuario'].tema);
        this.loggedIn.next(true);
        localStorage.setItem('token', response['token']);
        this._router.navigate(['/cuenta']);
      },
      error => {
        console.error(error);
      }
    );
  }

  signOut() {
    this.admin.next(false);
    this.loggedIn.next(false);
    this._router.navigate(['/inicio']);
  }

  getUserId() {
    return this.userId;
  }
}
