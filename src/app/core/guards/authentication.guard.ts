import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _authService: AuthenticationService,
              private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this._router.navigate(['/inicio-de-sesion']);
          return false;
        }
        return true;
      })
    );
  }

}
