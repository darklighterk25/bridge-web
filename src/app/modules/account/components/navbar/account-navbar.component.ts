import {Component, OnInit} from '@angular/core';
import {Enlace} from '../../../../shared/models/enlace.model';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html'
})
export class AccountNavbarComponent implements OnInit {

  enlaces: Enlace[];

  constructor() {
    this.enlaces = LINKS;
  }

  ngOnInit(): void {
  }

}

const LINKS: Enlace[] = [
  {
    nombre: 'Mi Cuenta',
    ruta: 'resumen'
  },
  {
    nombre: 'Publicaciones',
    ruta: 'publicaciones'
  },
  {
    nombre: 'Tarjetas',
    ruta: 'tarjetas'
  },
  {
    nombre: 'Historial',
    ruta: 'historial'
  },
];
