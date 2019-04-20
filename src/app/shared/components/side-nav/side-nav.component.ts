import {Component, OnInit} from '@angular/core';
import {Enlace} from '../../models/enlace.model';

@Component({
  selector: 'app-nav-links',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  enlaces: Enlace[];

  constructor() {
    this.admin = true;
    this.logged = true;
    this.enlaces = NAV_LINKS;
  }

  ngOnInit() {
  }

}

const NAV_LINKS: Enlace[] = [
  {
    nombre: 'Inicio',
    ruta: 'inicio',
    icono: 'fas fa-home',
    requiereSesion: false
  },
  {
    nombre: 'Cuenta',
    ruta: 'cuenta/resumen',
    icono: 'fas fa-user-circle',
    requiereSesion: true
  },
  {
    nombre: 'Chat',
    ruta: 'chat',
    icono: 'fas fa-comments',
    requiereSesion: true
  },
  {
    nombre: 'Pago',
    ruta: 'pago',
    icono: 'fas fa-credit-card',
    requiereSesion: false
  },
  {
    nombre: 'Inicio de Sesión',
    ruta: 'inicio-de-sesion',
    icono: 'fas fa-sign-in-alt',
    requiereSesion: false
  },
  {
    nombre: 'Registro',
    ruta: 'registro',
    icono: 'fas fa-user-plus',
    requiereSesion: false
  },
  {
    nombre: 'Administracion',
    ruta: 'administracion',
    icono: 'fas fa-wrench',
    requiereSesion: true,
    restringido: true
  },
  {
    nombre: 'Catálogo',
    ruta: 'catalogo',
    icono: 'fas fa-store',
    requiereSesion: false
  },
  {
    nombre: 'Artículo',
    ruta: 'articulo',
    icono: 'fas fa-archive',
    requiereSesion: false
  },
  {
    nombre: 'Lista de Deseos',
    ruta: 'lista-de-deseos',
    icono: 'fas fa-heart',
    requiereSesion: false
  },
  {
    nombre: 'Acerca de',
    ruta: 'acerca-de',
    icono: 'fas fa-info',
    requiereSesion: true,
    restringido: true
  },

  {
    nombre: 'Preguntas Frecuentes',
    ruta: 'preguntas-frecuentes',
    icono: 'fas fa-question',
    requiereSesion: true,
    restringido: true
  },
];
