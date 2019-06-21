import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../shared/enums/request-state.enum';
import {CarService} from '../../core/services/car.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {CommentService} from '../../core/services/comment.service';

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
  comments = [];

  constructor(private _carService: CarService,
              private _commentService: CommentService,
              private route: ActivatedRoute,
              private _authService: AuthenticationService) {
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
    this.commentsState = RequestState.initial;
    this.isLoggedIn = false;
    this._authService.isLoggedIn.subscribe(
      response => {
        this.isLoggedIn = response;
      },
      error => {});
    this.carState = RequestState.loading;
    this._carService.getCar(this.route.snapshot.paramMap.get('_id')).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.car = response.auto;
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
              this.comments.push(
                {
                  id: 1,
                  idUsuario: 1,
                  nombre: 'José Roberto Vázquez',
                  imagen: 'assets/about/sin-imagen.png',
                  comentario: this.commentForm.get('comment').value
                }
              );
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

  mostrarIcono() {
    document.getElementById('wishList').classList.remove('far');
    document.getElementById('wishList').classList.add('fas');
  }

  ocultarIcono() {
    document.getElementById('wishList').classList.remove('fas');
    document.getElementById('wishList').classList.add('far');
  }
}
