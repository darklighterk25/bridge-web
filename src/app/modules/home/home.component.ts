import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  title = 'Inicio';
  busqueda: FormGroup;
  minimo = 25000;
  maximo = 2000000;
  precio = this.minimo;
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
    },
    {
      id: 5,
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
      id: 6,
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

  imagenes = [
    {
      link: 'assets/home/carrusel1.jpg',
      titulo: '¡Bienvenido!',
      texto: 'Aquí podrás encontrar el carro que deseas.'
    },
    {
      link: 'assets/home/carrusel2.jpeg',
      titulo: '¿Aún no tienes vehículo?',
      texto: 'Da un vistazo a los vehículos que te ofrecemos.'
    },
    {
      link: 'assets/home/carrusel3.jpg',
      titulo: '¡Registrate!',
      texto: 'Realiza tu registro para poder vender o comprar vehículos.'
    },
    {
      link: 'assets/home/carrusel4.jpg',
      titulo: '¡Contamos con variedad!',
      texto: 'Te proporcionamos vehículos de gran variedad de las marcas del mercado.'
    }
  ];
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
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
}
