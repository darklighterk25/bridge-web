import {Component, OnInit} from '@angular/core';
import {Enlace} from '../../models/enlace.model';
import {NAV_LINKS} from '../../constants/nav-links';

@Component({
  selector: 'app-nav-links',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  enlaces: Enlace[];

  constructor() {
    this.admin = true;
    this.logged = true;
    this.enlaces = NAV_LINKS;
  }

  ngOnInit() {
  }

}

