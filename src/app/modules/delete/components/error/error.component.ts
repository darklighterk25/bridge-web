import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  timeout: number;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.timeout = 5;
    setInterval(
      () => {
        this.timeout--;
      },
      1000
    );
    setTimeout(
      () => {
        this.router.navigate(['/cuenta/resumen']);
      },
      5000
    );
  }
}
