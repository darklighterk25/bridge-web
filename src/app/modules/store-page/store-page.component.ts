import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../shared/enums/request-state.enum';
import {CarService} from '../../core/services/car.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {CommentService} from '../../core/services/comment.service';
import {WishListService} from '../../core/services/wish-list.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  title = 'Página individual del auto';
  posicionImagen = 0;
  carrouselImagen = 0;
  isLoggedIn: boolean;
  car: any;
  commentButtonDisabled = true;
  commentForm: FormGroup;
  carState: RequestState;
  commentsState: RequestState;
  newCommentState: RequestState;
  deleteCommentState: RequestState;
  comments = [];
  commentSelected = null;
  addToWishListState: RequestState;
  deleteFromWishListState: RequestState;
  wishListCheckState: RequestState;
  isInTheWishList: boolean;
  wishListId: string = null;

  constructor(private _carService: CarService,
              private _commentService: CommentService,
              private route: ActivatedRoute,
              private _authService: AuthenticationService,
              private _wishListService: WishListService) {
    this.commentForm = new FormGroup({
      'comment': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
    this.commentForm.valueChanges.subscribe(
      () => {
        this.commentButtonDisabled = !this.commentForm.valid;
      }
    );
  }

  ngOnInit() {
    this.newCommentState = RequestState.initial;
    this.deleteCommentState = RequestState.initial;
    this.commentsState = RequestState.initial;
    this.addToWishListState = RequestState.initial;
    this.deleteFromWishListState = RequestState.initial;
    this.wishListCheckState = RequestState.initial;
    this.isInTheWishList = false;
    this.isLoggedIn = false;
    this.carState = RequestState.loading;
    this._carService.getCar(this.route.snapshot.paramMap.get('_id')).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.car = response.auto;
              this._authService.isLoggedIn.subscribe(
                loggedInResponse => {
                  this.isLoggedIn = loggedInResponse;
                  if (this.isLoggedIn) {
                    this.wishListCheckState = RequestState.loading;
                    this._wishListService.isInWishList(this.car._id).subscribe(
                      wishListResponse => {
                        console.log(wishListResponse);
                        if (wishListResponse.ok) {
                          this.isInTheWishList = wishListResponse.existe;
                          this.wishListId = wishListResponse.id;
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
              this.carState = RequestState.success;
              this.getComments();
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

  getComments() {
    this.commentsState = RequestState.loading;
    this._commentService.getComments(this.car._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.comments = response.comentarios;
              this.commentsState = RequestState.success;
            } else {
              this.commentsState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.commentsState = RequestState.error;
          },
          2000
        );
      });
  }

  newComment() {
    this.newCommentState = RequestState.loading;
    this._commentService.newComment(this.car._id, this.commentForm.get('comment').value).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.comments.push(response.comentario);
              this.commentForm.get('comment').setValue('');
              this.commentForm.get('comment').markAsUntouched();
              this.commentForm.get('comment').markAsPristine();
              this.newCommentState = RequestState.success;
            } else {
              this.newCommentState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.newCommentState = RequestState.error;
          },
          2000
        );
      });
  }

  deleteComment() {
    this.deleteCommentState = RequestState.loading;
    this._commentService.deleteComment(this.comments[this.commentSelected]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.comments.splice(this.commentSelected, 1);
              this.commentSelected = null;
              this.deleteCommentState = RequestState.success;
            } else {
              this.deleteCommentState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteCommentState = RequestState.error;
          },
          2000
        );
      });
  }

  mostrarIcono() {
    if (this.wishListCheckState !== RequestState.error) {
      if (this.addToWishListState === RequestState.error) {
        this.addToWishListState = RequestState.initial;
      }
      if (this.deleteFromWishListState === RequestState.error) {
        this.deleteFromWishListState = RequestState.initial;
      }
    }
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
