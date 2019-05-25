import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [NgbCarouselConfig]
})
export class AboutComponent implements OnInit {

  title = 'Acerca de';
  creadores = [
    {
      nombre: 'Rafael Alejandro Muñoz Guzmán',
      imagen: 'assets/about/sin-imagen.png'
    },
    {
      nombre: 'Daniel Fermín Romo López',
      imagen: 'assets/about/sin-imagen.png'
    },
    {
      nombre: 'José Eduardo Valdéz Rodríguez',
      imagen: 'assets/about/sin-imagen.png'
    },
    {
      nombre: 'Victor Manuel Vidales Hernández',
      imagen: 'assets/about/sin-imagen.png'
    }
  ];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit() {
  }
}
