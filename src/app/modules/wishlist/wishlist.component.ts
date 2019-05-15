import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  title = 'Lista de deseos';
  vehiculoAyuda = {
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
  vehiculos = [
    {
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
    },
    {
      id: 2,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      calificacion: 3,
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    },
    {
      id: 3,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
      imagenVendedor: 'assets/about/sin-imagen.png',
      calificacion: 4,
      imagenVehiculo: 'assets/store-page/vehiculo.jpg',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
      precio: '150000',
      color: 'Blanco',
      estado: 'Usado',
      kilometraje: '30000'
    },
    {
      id: 4,
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
    }
  ];
  constructor() {
  }

  ngOnInit() {
  }
}
