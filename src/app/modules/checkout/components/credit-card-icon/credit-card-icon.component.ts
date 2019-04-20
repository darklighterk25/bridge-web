import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-credit-card-icon',
  templateUrl: './credit-card-icon.component.html'
})
export class CreditCardIconComponent implements OnInit {

  @Input() cardType: number;

  constructor() {
  }

  ngOnInit() {
  }

}
