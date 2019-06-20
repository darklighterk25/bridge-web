import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Enlace} from '../../models/enlace.model';
import {ADMIN_LINKS} from '../../constants/admin-links';
import {USER_LINKS} from '../../constants/user-links';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  isAdmin = false;
  links: Enlace[] = USER_LINKS;
  subscription: Subscription;

  constructor(private _authService: AuthenticationService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._authService.isAdmin.subscribe(
      data => {
        this.isAdmin = data;
        this.isAdmin ? this.links = ADMIN_LINKS : this.links = USER_LINKS;
      }
    );
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
