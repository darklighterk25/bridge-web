import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {RequestState} from '../../shared/enums/request-state.enum';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {

  title = 'Eliminar cuenta';
  deleteState: RequestState;

  constructor(private _userService: UserService,
              private _router: Router) { }

  ngOnInit() {
    this.deleteState = RequestState.initial;
  }

  cancel(): void {
    this._router.navigate(['/cuenta/resumen']);
  }

  delete(): void {
    console.log('Cuenta eliminada');
    this.deleteState = RequestState.loading;
    setTimeout(
      () => {
        if (false) {
          this.deleteState = RequestState.success;
        } else {
          this.deleteState = RequestState.error;
        }
      },
      4000
    );
    /*this._userService.deleteUser().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.deleteState = RequestState.success;
            } else {
              this.deleteState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteState = RequestState.error;
          },
          2000
        );
      });*/
    // this._router.navigate(['eliminar-cuenta']);
  }
}
