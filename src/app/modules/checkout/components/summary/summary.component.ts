import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarService} from '../../../../core/services/car.service';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {

  @Input() providerFeed: any = null;
  carState: RequestState;
  car: any;

  constructor(private _carService: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.carState = RequestState.loading;
    this._carService.getCar(this.route.snapshot.paramMap.get('_id')).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.car = response.auto;
              this.carState = RequestState.success;
            } else {
              this.carState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            // console.error(error);
            this.carState = RequestState.error;
          },
          2000
        );
      });
  }
}
