import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Enlace} from '../../models/enlace.model';
import {UserService} from '../../../core/services/user.service';
import {USER_LINKS} from '../../constants/user-links';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  links: Enlace[];
  subscription: Subscription;

  constructor(private _authService: AuthenticationService,
              private _router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this.links = USER_LINKS;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigate(param: string): void {
    this._router.navigate([param]);
  }

  signOut(): void {
    this._authService.signOut();
  }
}
