import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styles: []
})
export class UpdatePhotoComponent implements OnInit {

  disableBtn: boolean;
  selectedFile = null;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.disableBtn = true;
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.disableBtn = false;
  }

  onUpload(): void {
  }
}
