import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SideNavComponent} from './shared/components/side-nav/side-nav.component';
import {TopNavComponent} from './shared/components/top-nav/top-nav.component';
import {UnsignedUserMenuComponent} from './shared/components/unsigned-user-menu/unsigned-user-menu.component';
import {UserMenuComponent} from './shared/components/user-menu/user-menu.component';
import {WebNavComponent} from './shared/components/nav/nav.component';

import {AboutModule} from './modules/about/about.module';
import {AccountModule} from './modules/account/account.module';
import {AdminModule} from './modules/admin/admin.module';
import {AngularMaterialModule} from './modules/angular-material.module';
import {ChatModule} from './modules/chat/chat.module';
import {CheckoutModule} from './modules/checkout/checkout.module';
import {EditModule} from './modules/edit/edit.module';
import {FAQModule} from './modules/faq/faq.module';
import {HomeModule} from './modules/home/home.module';
import {LayoutModule} from '@angular/cdk/layout';
import {SignInModule} from './modules/sign-in/sign-in.module';
import {SignUpModule} from './modules/sign-up/sign-up.module';
import {StoreModule} from './modules/store/store.module';
import {StorePageModule} from './modules/store-page/store-page.module';
import {WishlistModule} from './modules/wishlist/wishlist.module';

// Servicios
import {AuthenticationGuard} from './core/authentication/authentication.guard';
import {AuthenticationService} from './core/authentication/authentication.service';
import {PaymentService} from './core/services/payment.service';
import {UserService} from './core/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    UnsignedUserMenuComponent,
    UserMenuComponent,
    WebNavComponent,
  ],
  imports: [
    AboutModule,
    AccountModule,
    AdminModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChatModule,
    CheckoutModule,
    EditModule,
    FAQModule,
    HomeModule,
    LayoutModule,
    SignInModule,
    SignUpModule,
    StoreModule,
    StorePageModule,
    WishlistModule,
    NgbModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    PaymentService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
