import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../core/services/account.service';
import {CarService} from '../../../../core/services/car.service';
import {RequestState} from '../../../../shared/enums/request-state.enum';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html'
})
export class ListingsComponent implements OnInit {
  title = 'Publicaciones';
  cars: any[];
  carsState: RequestState;
  deleteState: RequestState;
  publicationSelected: number;

  constructor(private _accountSevice: AccountService,
              private _carService: CarService) {
  }

  ngOnInit(): void {
    this.deleteState = RequestState.initial;
    this.carsState = RequestState.loading;
    this.publicationSelected = null;
    this._accountSevice.getCars().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.cars = response.autos;
              this.carsState = RequestState.success;
            } else {
              this.carsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.carsState = RequestState.error;
          },
          2000
        );
      });
  }

  deleteConfirmation(): void {
    this.deleteState = RequestState.loading;
    this._carService.deleteCar(this.cars[this.publicationSelected]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.cars.splice(this.publicationSelected, 1);
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
      });
  }

  endDeleteProcess() {
    this.publicationSelected = null;
    this.deleteState = RequestState.initial;
  }
}
