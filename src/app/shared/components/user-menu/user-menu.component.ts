import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Enlace} from '../../models/enlace.model';
import {Usuario} from '../../models/usario.model';
import {UserService} from '../../../core/services/user.service';
import {USER_LINKS} from '../../constants/user-links';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  user: Usuario;
  links: Enlace[];

  constructor(private _authService: AuthenticationService,
              private _router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this.links = USER_LINKS;
    this.user = this._userService.getUser();
  }

  navigate(param: string): void {
    this._router.navigate([param]);
  }

  signOut(): void {
    this._authService.signOut();
  }
}
