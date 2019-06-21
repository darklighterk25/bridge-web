import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  title = 'Pago';

  providerFeed: number = null;
  constructor() {
  }

  ngOnInit() {
  }

  providerFeedChange(event) {
    this.providerFeed = event.providerFeed;
  }
}
