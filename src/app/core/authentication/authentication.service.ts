import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private _router: Router) {
  }

  signIn(email: string, password: string): void {
    if (email !== '' && password !== '' ) {
      this.admin.next(true);
      this.loggedIn.next(true);
      this._router.navigate(['/cuenta']);
    }
  }

  signOut() {
    this.admin.next(false);
    this.loggedIn.next(false);
    this._router.navigate(['/']);
  }
}
