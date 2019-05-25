import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unsigned-user-menu',
  templateUrl: './unsigned-user-menu.component.html',
  styleUrls: ['./unsigned-user-menu.component.scss']
})
export class UnsignedUserMenuComponent implements OnInit {

  constructor(public _router: Router) {
  }

  ngOnInit() {
  }

}
