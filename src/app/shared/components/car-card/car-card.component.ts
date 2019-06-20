import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() car: any = null;

  constructor() {
  }

  ngOnInit() {
  }

  mostrarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeOut');
    document.getElementById('verMas' + this.car._id).classList.add('fadeIn');
  }

  quitarVerMas() {
    document.getElementById('verMas' + this.car._id).classList.remove('fadeIn');
    document.getElementById('verMas' + this.car._id).classList.add('fadeOut');
  }
}
