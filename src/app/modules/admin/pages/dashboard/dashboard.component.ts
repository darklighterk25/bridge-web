import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  title = 'Administración del sitio';

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  brandConfiguration() {
    this._router.navigate(['/administracion/marcas$']);
  }

  modelConfiguration() {
    this._router.navigate(['/administracion/modelos$']);
  }
}
