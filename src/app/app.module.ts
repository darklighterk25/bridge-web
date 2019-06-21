import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/components/footer/footer.component';
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
import {ContactModule} from './modules/contact/contact.module';
import {DeleteModule} from './modules/delete/delete.module';
import {EditModule} from './modules/edit/edit.module';
import {EditPublicationModule} from './modules/edit-publication/edit-publication.module';
import {FAQModule} from './modules/faq/faq.module';
import {HomeModule} from './modules/home/home.module';
import {NotFoundModule} from './modules/not-found/not-found.module';
import {PublishModule} from './modules/publish/publish.module';
import {SignInModule} from './modules/sign-in/sign-in.module';
import {SignUpModule} from './modules/sign-up/sign-up.module';
import {StoreModule} from './modules/store/store.module';
import {StorePageModule} from './modules/store-page/store-page.module';
import {TermsModule} from './modules/terms/terms.module';
import {WishlistModule} from './modules/wishlist/wishlist.module';

// Servicios
import {AccountService} from './core/services/account.service';
import {AdministrationGuard} from './core/guards/administration.guard';
import {AuthenticationGuard} from './core/guards/authentication.guard';
import {AuthenticationService} from './core/authentication/authentication.service';
import {CarService} from './core/services/car.service';
import {PaymentService} from './core/services/payment.service';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {UserService} from './core/services/user.service';
import {ModelService} from './core/services/model.service';
import {BrandService} from './core/services/brand.service';
import {CardService} from './core/services/card.service';
import {ReportService} from './core/services/report.service';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    UnsignedUserMenuComponent,
    UserMenuComponent,
    WebNavComponent,
    FooterComponent
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
    ContactModule,
    DeleteModule,
    EditModule,
    EditPublicationModule,
    FAQModule,
    HomeModule,
    LayoutModule,
    PublishModule,
    SignInModule,
    SignUpModule,
    StoreModule,
    StorePageModule,
    TermsModule,
    WishlistModule,
    NotFoundModule,
    NgbModule,
    ChartsModule
  ],
  exports: [
    ChartsModule
  ],
  providers: [
    AccountService,
    AdministrationGuard,
    AuthenticationGuard,
    AuthenticationService,
    CarService,
    PaymentService,
    UserService,
    ModelService,
    BrandService,
    CardService,
    ReportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
