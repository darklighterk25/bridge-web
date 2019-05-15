import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {

  title = 'Catálogo';
  busqueda: FormGroup;
  minimo = 25000;
  maximo = 2000000;
  precio = this.minimo;
  busquedaSolicitada = false;
  modeloSolicitud = null;
  marcaSolicitud = null;
  precioSolicitud = null;
  estadoSolicitud = null;
  ordenSolicitud = null;
  vehiculos = [
    {
      id: 1,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: '2018',
      vendedor: 'Alfredo Torres Jiménez',
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
    this.busqueda = new FormGroup({
      'marca': new FormControl( ''
      ),
      'modelo': new FormControl({value: '', disabled: true}
      ),
      'estado': new FormControl(''
      ),
      'precio': new FormControl(''
      ),
    });
  }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    return Math.round(value / 1000) + 'k';
  }
  obtenerValor(value: number | null) {
    return Math.round(value / 1000) * 1000;
  }

  inicializar() {
    if (this.busqueda.get('marca').value !== '') {
      this.busqueda.get('modelo').disable();
    } else {
      this.busqueda.get('modelo').enable();
    }
    this.busqueda.get('modelo').setValue('');
  }

  realizarBusqueda() {
    this.busquedaSolicitada = true;
    this.marcaSolicitud = this.busqueda.get('marca').value;
    this.modeloSolicitud = this.busqueda.get('modelo').value;
    this.estadoSolicitud = this.busqueda.get('estado').value;
    this.precioSolicitud = this.precio;
    this.ordenSolicitud = this.busqueda.get('precio').value;
  }
}
