import {Component, OnInit} from '@angular/core';
import {NAV_LINKS} from '../../constants/nav-links';
import {Enlace} from '../../models/enlace.model';
import {AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  isAdmin: boolean;
  navLinks: Enlace[];

  constructor(private _authService: AuthenticationService) {
    this.navLinks = NAV_LINKS;
  }

  ngOnInit(): void {
    this._authService.isAdmin.subscribe(
      data => this.isAdmin = data
    );
  }

}
