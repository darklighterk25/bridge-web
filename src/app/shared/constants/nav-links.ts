import {Enlace} from '../models/enlace.model';

export const NAV_LINKS: Enlace[] = [
  {
    nombre: 'Inicio',
    ruta: 'inicio',
    icono: 'fas fa-home',
    requiereSesion: false
  },
  {
    nombre: 'Cuenta',
    ruta: 'cuenta',
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
