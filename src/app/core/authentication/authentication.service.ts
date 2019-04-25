import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private _router: Router) {
  }

  signIn(email: string, password: string): void {
    if (email !== '' && password !== '' ) {
      this.loggedIn.next(true);
      this._router.navigate(['/']);
    }
  }

  signOut() {
    this.loggedIn.next(false);
    this._router.navigate(['/']);
  }
}
