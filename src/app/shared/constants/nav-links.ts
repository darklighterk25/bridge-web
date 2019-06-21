import {Enlace} from '../models/enlace.model';

export const NAV_LINKS: Enlace[] = [
  {
    nombre: 'Inicio',
    ruta: 'inicio',
    icono: 'fas fa-home',
    hide: true
  },
  {
    nombre: 'Catálogo',
    ruta: 'catalogo',
    icono: 'fas fa-store',
    hide: true
  },
  {
    nombre: 'Acerca de',
    ruta: 'acerca-de',
    icono: 'fas fa-info'
  },
  {
    nombre: 'Preguntas Frecuentes',
    ruta: 'preguntas-frecuentes',
    icono: 'fas fa-question'
  },
  {
    nombre: 'Contacto',
    ruta: 'contacto',
    icono: 'far fa-envelope'
  }
];
