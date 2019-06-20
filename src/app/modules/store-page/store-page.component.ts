import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../shared/enums/request-state.enum';
import {CarService} from '../../core/services/car.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  title = 'Página individual del auto';
  posicionImagen = 0;
  carrouselImagen = 0;
  id = 3;
  car: any;
  vehiculo = {
    id: 4,
    marca: 'Nissan',
    modelo: 'Versa',
    anio: '2018',
    vendedor: 'Alfredo Torres Jiménez',
    calificacion: 4,
    imagenVendedor: 'assets/about/sin-imagen.png',
    imagenesVehiculo: [
      'assets/store-page/vehiculo.jpg',
      'assets/store-page/vehiculo.jpg',
      'assets/about/sin-imagen.png',
      'assets/store-page/vehiculo.jpg',
      'assets/store-page/vehiculo.jpg'
    ],
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobis odit omnis optio perspiciatis quam quasi, quibusdam ratione reiciendis, rem repellendus repudiandae tempore.',
    precio: '150000',
    estado: 'Usado',
    kilometraje: '30000',
    extranjero: false,
    total_duenios: 2,
    total_accidentes: 0,
    tipo_motor: 'Gasolina',
    transmision: 'Estándar',
    alarma: true,
    aire_acondicionado: true,
    interiores: 'Tela',
    color_interior: 'Negro',
    color_exterior: 'Blanco',
    vidrios_electricos: true,
    puertas_electricas: true,
    bolsas_de_aire_piloto: 1,
    bolsas_de_aire_pasajero: 1,
    bolsas_de_aire_laterales: 2,
    seguro_de_ninios: true,
    control_de_estabilidad: true,
    bluetooth: true,
    sensor_frontal: false,
    sensor_trasero: true,
    camara_trasera: false,
    comentarios: [
      {
        id: 1,
        idUsuario: 1,
        nombre: 'José Roberto Vázquez',
        // calificacion: 5,
        imagen: 'assets/about/sin-imagen.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis consectetur cupiditate eum, ex iure labore nobi.'
      },
      {
        id: 2,
        idUsuario: 2,
        nombre: 'Pedro Carrillo Sandoval',
        // calificacion: 4,
        imagen: 'assets/about/sin-imagen.png',
        comentario: 'Dsadkbew sakjdas ewk consectetur adipisicing elit. Architecto blanditiis consectetur cupidit.'
      },
      {
        id: 3,
        idUsuario: 3,
        nombre: 'José Roberto Vázquez',
        // calificacion: 5,
        imagen: 'assets/about/sin-imagen.png',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asdeum, ex iure labore nobi. Sasdnlkjsad sakld ekl wqleqwm e.'
      }
    ]
  };
  deshabilitarBotonComentario = true;
  formularioComentario: FormGroup;
  carState: RequestState;

  constructor(private _carService: CarService, private route: ActivatedRoute) {
    this.formularioComentario = new FormGroup({
      'comentario': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
    this.formularioComentario.valueChanges.subscribe(
      () => {
        this.deshabilitarBotonComentario = !this.formularioComentario.valid;
      }
    );
  }

  ngOnInit() {
    this.carState = RequestState.loading;
    this._carService.getCar(this.route.snapshot.paramMap.get('_id')).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.car = response.auto;
              this.carState = RequestState.success;
            } else {
              this.carState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            // console.error(error);
            this.carState = RequestState.error;
          },
          2000
        );
      });
  }

  mostrarIcono() {
    document.getElementById('wishList').classList.remove('far');
    document.getElementById('wishList').classList.add('fas');
  }

  ocultarIcono() {
    document.getElementById('wishList').classList.remove('fas');
    document.getElementById('wishList').classList.add('far');
  }
}
