import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Observable} from 'rxjs';
import {RequestState} from '../../enums/request-state.enum';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() car: any = null;
  isLoggedIn: boolean;

  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this.isLoggedIn = false;
    this._authService.isLoggedIn.subscribe(
      response => {
        this.isLoggedIn = response;
      },
      error => {});
  }

  mostrarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeOut');
    document.getElementById('verMas' + this.car._id).classList.add('fadeIn');
  }

  quitarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeIn');
    document.getElementById('verMas' + this.car._id).classList.add('fadeOut');
  }
}
