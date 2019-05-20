import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {

  vehiculo = {
    id: 1,
    marca: 'Nissan',
    modelo: 'Versa',
    anio: '2018',
    vendedor: 'Alfredo Torres Jiménez',
    calificacion: 5,
    imagenVendedor: 'assets/about/sin-imagen.png',
    imagenVehiculo: 'assets/store-page/vehiculo.jpg',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
    precio: '150000',
    color: 'Blanco',
    estado: 'Usado',
    kilometraje: '30000'
  };
  constructor() {
  }

  ngOnInit() {
  }

}
