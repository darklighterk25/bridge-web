import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req, next) {
    const authService = this.injector.get(AuthenticationService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: authService.getToken()
      }
    });
    return next.handle(tokenizedReq);
  }
}
