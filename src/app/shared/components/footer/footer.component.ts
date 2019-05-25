import {Component, OnInit} from '@angular/core';
import {Enlace} from '../../models/enlace.model';
import {NAV_LINKS} from '../../constants/nav-links';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  navLinks: Enlace[];

  constructor() {
    this.navLinks = NAV_LINKS;
  }

  ngOnInit() {
  }

}
