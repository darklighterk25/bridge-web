import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../shared/enums/request-state.enum';
import {WishListService} from '../../core/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  title = 'Lista de deseos';
  deleteState: RequestState;
  deleteAllState: RequestState;
  wishListState: RequestState;
  wishListCarSelected: number;
  wishList = [];
  deleteAllCars: boolean = null;

  constructor(private _wishListService: WishListService) {
  }

  ngOnInit() {
    this.deleteState = RequestState.initial;
    this.deleteAllState = RequestState.initial;
    this.wishListState = RequestState.loading;
    this.wishListCarSelected = null;
    this.deleteAllCars = false;
    this._wishListService.getWishListCars().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.wishList = response.wishList;
              console.log(this.wishList);
              this.wishListState = RequestState.success;
            } else {
              this.wishListState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.wishListState = RequestState.error;
          },
          2000
        );
      });
  }

  deleteConfirmation(): void {
    this.deleteState = RequestState.loading;
    this._wishListService.deleteCarFromWishList(this.wishList[this.wishListCarSelected]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.wishList.splice(this.wishListCarSelected, 1);
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
    this.wishListCarSelected = null;
    this.deleteState = RequestState.initial;
  }

  deleteAllConfirmation(): void {
    this.deleteAllState = RequestState.loading;
    this._wishListService.deleteAllCarsFromWishList().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.wishList = [];
              this.deleteAllState = RequestState.success;
            } else {
              this.deleteAllState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteAllState = RequestState.error;
          },
          2000
        );
      });
  }

  endDeleteAllProcess() {
    this.deleteAllCars = false;
    this.deleteAllState = RequestState.initial;
  }
}
