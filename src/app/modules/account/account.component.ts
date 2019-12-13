import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  title = 'Cuenta';
  isAdmin: boolean;

  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this._authService.isAdmin.subscribe(
      data => {
        this.isAdmin = data;
      }
    );
  }
}
