import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {RequestState} from '../../enums/request-state.enum';
import {WishListService} from '../../../core/services/wish-list.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() car: any = null;
  isLoggedIn: boolean;
  addToWishListState: RequestState;
  deleteFromWishListState: RequestState;
  wishListCheckState: RequestState;
  isInTheWishList: boolean;
  wishListId: string = null;

  constructor(private _authService: AuthenticationService, private _wishListService: WishListService) {
  }

  ngOnInit() {
    this.addToWishListState = RequestState.initial;
    this.deleteFromWishListState = RequestState.initial;
    this.wishListCheckState = RequestState.initial;
    this.isInTheWishList = false;
    this.isLoggedIn = false;
    this._authService.isLoggedIn.subscribe(
      response => {
        this.isLoggedIn = response;
        if (this.isLoggedIn) {
          this.wishListCheckState = RequestState.loading;
          this._wishListService.isInWishList(this.car._id).subscribe(
            wishListResponse => {
              console.log(wishListResponse);
              if (wishListResponse.ok) {
                this.isInTheWishList = wishListResponse.existe;
                if (this.isInTheWishList) {
                  this.wishListId = wishListResponse.id;
                }
                this.wishListCheckState = RequestState.success;
              } else {
                this.wishListCheckState = RequestState.error;
              }
            },
            error => {
              console.error(error);
              this.wishListCheckState = RequestState.error;
            });
        }
      },
      error => {});
  }

  mostrarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeOut');
    document.getElementById('verMas' + this.car._id).classList.add('fadeIn');
    if (this.wishListCheckState !== RequestState.error) {
      if (this.addToWishListState === RequestState.error) {
        this.addToWishListState = RequestState.initial;
      }
      if (this.deleteFromWishListState === RequestState.error) {
        this.deleteFromWishListState = RequestState.initial;
      }
    }
  }

  quitarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeIn');
    document.getElementById('verMas' + this.car._id).classList.add('fadeOut');
  }

  addToWishList() {
    this.addToWishListState = RequestState.loading;
    const data = {
      auto: this.car._id
    };
    this._wishListService.addCarToWishList(data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.isInTheWishList = true;
              this.wishListId = response.wishList._id;
              this.deleteFromWishListState = RequestState.initial;
              this.addToWishListState = RequestState.success;
            } else {
             this.addToWishListState = RequestState.error;
            }
          },
          1000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.addToWishListState = RequestState.error;
          },
          1000
        );
      });
  }

  deleteFromWishList() {
    this.deleteFromWishListState = RequestState.loading;
    this._wishListService.deleteCarFromWishList(this.wishListId).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.isInTheWishList = false;
              this.addToWishListState = RequestState.initial;
              this.deleteFromWishListState = RequestState.success;
            } else {
              this.deleteFromWishListState = RequestState.error;
            }
          },
          1000
        );
      },
      error => {
        setTimeout(
          () => {
            console.error(error);
            this.deleteFromWishListState = RequestState.error;
          },
          1000
        );
      });
  }
}
