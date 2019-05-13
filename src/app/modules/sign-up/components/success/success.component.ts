import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styles: []
})
export class SuccessComponent implements OnInit {

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
        this.router.navigate(['/inicio-de-sesion']);
      },
      5000
    );
  }

}
