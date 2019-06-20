import {Component, OnInit} from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {UserService} from '../../../../core/services/user.service';
import {FormBuilder} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService) {
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
    const fd = new FormData();
    fd.append('imagen', this.selectedFile, this.selectedFile.name);
    this._userService.updatePhoto(fd).subscribe(
      response => {
        if (response.ok) {
          this.imageState = RequestState.success;
          console.log(response);
        } else {
          this.imageState = RequestState.error;
          console.error(response);
        }
      },
      error => {
        this.imageState = RequestState.error;
        console.error(error);
      });
  }
}
