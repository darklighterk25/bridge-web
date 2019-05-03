import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  title = 'Acerca de';
  creadores = [
    {
      nombre: 'Rafael Alejandro Muñoz Guzmán',
      imagen: 'assets/about/sin-imagen.png'
    },
    {
      nombre: 'Danie Fermín Romo López',
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
  constructor() {
  }

  ngOnInit() {
  }
}
