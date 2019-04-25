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

  isLoggedIn$: Observable<boolean>;
  admin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private lightsOn: boolean;

  constructor(private _authService: AuthenticationService,
              private breakpointObserver: BreakpointObserver,
              public overlayContainer: OverlayContainer) {
    this.componentCssClass = 'default-theme';
    this.lightsOn = true;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn;
  }

  logout(): void {
    this._authService.signOut();
  }

  onSetTheme(): void {
    this.lightsOn = !this.lightsOn;
    let theme: string;
    if (this.lightsOn) {
      theme = 'default-theme';
    } else {
      theme = 'night-theme';
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

}
