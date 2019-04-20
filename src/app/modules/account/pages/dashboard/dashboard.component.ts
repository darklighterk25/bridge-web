import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Usuario} from '../../../../shared/models/usario.model';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user: Usuario;

  constructor(private _userService: UserService,
              private _router: Router) {
    this.user = _userService.getUser();
  }

  ngOnInit(): void {
  }

  edit(): void {
    this._router.navigate(['editar-informacion']);
  }

}
