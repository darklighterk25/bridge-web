import {Component, OnInit} from '@angular/core';
import {NAV_LINKS} from '../../constants/nav-links';
import {Enlace} from '../../models/enlace.model';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  navLinks: Enlace[];

  constructor() {
    this.navLinks = NAV_LINKS;
  }

  ngOnInit() {
  }

}
