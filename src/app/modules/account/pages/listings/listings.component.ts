import {Component, OnInit} from '@angular/core';
import {Auto} from '../../../../shared/models/auto.model';
import {AccountService} from '../../../../core/services/account.service';
import {CarService} from '../../../../core/services/car.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html'
})
export class ListingsComponent implements OnInit {
  title = 'Publicaciones';
  vehiculos: Auto[];

  constructor(private _accountSevice: AccountService,
              private _carService: CarService) {
  }

  ngOnInit(): void {
    this._accountSevice.getCars().subscribe(
      data => {
        console.log(data);
        this.vehiculos = data['autos'];
      }
    );
  }

  deleteCar(index: number, id: string): void {
    console.log(id);
    this._carService.deleteCar(id).subscribe(
      () => delete this.vehiculos[index]
    );
  }
}
