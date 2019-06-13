import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styles: []
})
export class UpdatePhotoComponent implements OnInit {

  title = 'Cambiar avatar';
  disableBtn: boolean;
  selectedFile = null;
  imageState: RequestState;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.disableBtn = true;
    this.imageState = RequestState.initial;
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.disableBtn = false;
    console.log(this.selectedFile);
  }

  onUpload(): void {
    this.imageState = RequestState.loading;
    this._userService.updatePhoto(this.selectedFile).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.imageState = RequestState.success;
            } else {
              this.imageState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.imageState = RequestState.error;
          },
          2000
        );
      });
  }
}
