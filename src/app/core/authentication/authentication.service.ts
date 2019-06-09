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
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isAdmin() {
    return this.admin.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private _router: Router,
              private _httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  signIn(email: string, password: string): void {
    this._httpClient.post(`${APP_SETTINGS.API_ENDPOINT}/login`, {email: email, contrasena: password}, APP_SETTINGS.OPTIONS).subscribe(
      response => {
        console.log(response);
        this.admin.next(response['usuario'].isAdmin);
        this.loggedIn.next(true);
        localStorage.setItem('token', response['token']);
        this._router.navigate(['/cuenta']);
      },
      error => console.error(error)
    );
  }

  signOut() {
    this.admin.next(false);
    this.loggedIn.next(false);
    this._router.navigate(['/']);
  }
}
