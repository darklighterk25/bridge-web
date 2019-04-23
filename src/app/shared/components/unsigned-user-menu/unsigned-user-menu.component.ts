import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unsigned-user-menu',
  templateUrl: './unsigned-user-menu.component.html'
})
export class UnsignedUserMenuComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

}
