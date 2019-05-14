import {Component, HostBinding, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OverlayContainer} from '@angular/cdk/overlay';

import {AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class WebNavComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  private admin$: Observable<boolean>;

  get isAdmin() {
    return this.admin$;
  }

  isLoggedIn$: Observable<boolean>;
  admin: boolean;
  accessibility: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches)
    );

  constructor(private _authService: AuthenticationService,
              private breakpointObserver: BreakpointObserver,
              public overlayContainer: OverlayContainer) {
    this.componentCssClass = 'default-theme';
    this.accessibility = false;
  }

  ngOnInit(): void {
    this.admin$ = this._authService.isAdmin;
    this.isLoggedIn$ = this._authService.isLoggedIn;
  }

  logout(): void {
    this._authService.signOut();
  }

  onSetTheme(): void {
    this.accessibility = !this.accessibility;
    let theme: string;
    if (this.accessibility) {
      theme = 'tritanerope-theme';
    } else {
      theme = 'default-theme';
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

}
