import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() vehiculo: any = null;

  constructor() {
  }

  ngOnInit() {
  }

  mostrarVerMas() {
    document.getElementById('verMas' + this.vehiculo.id).classList.remove('fadeOut');
    document.getElementById('verMas' + this.vehiculo.id).classList.add('fadeIn');
  }

  quitarVerMas() {
    document.getElementById('verMas' + this.vehiculo.id).classList.remove('fadeIn');
    document.getElementById('verMas' + this.vehiculo.id).classList.add('fadeOut');
  }
}
