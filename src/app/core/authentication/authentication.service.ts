import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiEndpoint: string;

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
    this.apiEndpoint = 'https://bridge-back-end.herokuapp.com';
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  signIn(email: string, password: string): void {
    this._httpClient.post( `${this.apiEndpoint}/login`, {email: email, contrasena: password} ).subscribe(
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
