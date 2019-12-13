import {Component, HostBinding, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OverlayContainer} from '@angular/cdk/overlay';

import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class WebNavComponent implements OnInit {

  @HostBinding('class') theme;

  private admin$: Observable<boolean>;

  get isAdmin() {
    return this.admin$;
  }

  isLoggedIn$: Observable<boolean>;
  admin: boolean;
  accessibility: boolean;
  largeFont: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches)
    );

  constructor(private _authService: AuthenticationService,
              private _userService: UserService,
              private breakpointObserver: BreakpointObserver,
              public overlayContainer: OverlayContainer) {
    this.theme = 'default-theme';
    this.accessibility = false;
    this.largeFont = false;
  }

  ngOnInit(): void {
    this.admin$ = this._authService.isAdmin;
    this.isLoggedIn$ = this._authService.isLoggedIn;
    this._authService.userTheme.subscribe(
      theme => this.theme = theme
    );
  }

  logout(): void {
    this._authService.signOut();
  }

  onSetTheme(): void {
    let theme: string;
    if (!this.accessibility && !this.largeFont) {
      theme = 'default-theme';
    } else if (this.accessibility && !this.largeFont) {
      theme = 'tritanerope-theme';
    } else if (!this.accessibility && this.largeFont) {
      theme = 'default-theme-big';
    } else {
      theme = 'tritanerope-theme-big';
    }
    this._userService.updateTheme(theme).subscribe(
      success => console.log(success),
      error => console.error(error),
    );
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.theme = theme;
  }

  setLargeFont(value: boolean): void {
    this.largeFont = value;
    this.onSetTheme();
  }

  setAccesibility(): void {
    this.accessibility = !this.accessibility;
    this.onSetTheme();
  }
}
