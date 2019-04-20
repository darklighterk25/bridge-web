import {Routes} from '@angular/router';

import {ABOUT_ROUTES} from './modules/about/about.routes';
import {ACCOUNT_ROUTES} from './modules/account/account.routes';
import {ADMIN_ROUTES} from './modules/admin/admin.routes';
import {CHAT_ROUTES} from './modules/chat/chat.routes';
import {CHECKOUT_ROUTES} from './modules/checkout/checkout.routes';
import {EDIT_ROUTES} from './modules/edit/edit.routes';
import {FAQ_ROUTES} from './modules/faq/faq.routes';
import {HOME_ROUTES} from './modules/home/home.routes';
import {SIGN_IN_ROUTES} from './modules/sign-in/sign-in.routes';
import {SIGN_UP_ROUTES} from './modules/sign-up/sign-up.routes';
import {STORE_ROUTES} from './modules/store/store.routes';
import {STORE_PAGE_ROUTES} from './modules/store-page/store-page.routes';
import {WISHLIST_ROUTES} from './modules/wishlist/wishlist.routes';

export const routes: Routes = [
  {path: 'acerca-de', children: ABOUT_ROUTES},
  {path: 'cuenta', children: ACCOUNT_ROUTES},
  {path: 'administracion', children: ADMIN_ROUTES},
  {path: 'chat', children: CHAT_ROUTES},
  {path: 'pago', children: CHECKOUT_ROUTES},
  {path: 'inicio', children: HOME_ROUTES},
  {path: 'editar-informacion', children: EDIT_ROUTES},
  {path: 'preguntas-frecuentes', children: FAQ_ROUTES},
  {path: 'inicio-de-sesion', children: SIGN_IN_ROUTES},
  {path: 'registro', children: SIGN_UP_ROUTES},
  {path: 'catalogo', children: STORE_ROUTES},
  {path: 'articulo', children: STORE_PAGE_ROUTES},
  {path: 'lista-de-deseos', children: WISHLIST_ROUTES},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];
