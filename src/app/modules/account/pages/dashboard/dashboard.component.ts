import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Usuario} from '../../../../shared/models/usario.model';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  title = 'Mi Cuenta';
  user: Usuario;

  constructor(private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._userService.getUser().subscribe(
      data => this.user = data['usuario']
    );
  }

  edit(): void {
    this._router.navigate(['editar-informacion']);
  }

}
