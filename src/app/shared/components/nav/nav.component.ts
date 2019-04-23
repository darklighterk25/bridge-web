import {Component, HostBinding} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-web-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class WebNavComponent {

  @HostBinding('class') componentCssClass;

  private loggedIn: boolean;
  private admin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private lightsOn: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              public overlayContainer: OverlayContainer) {
    this.componentCssClass = 'default-theme';
    this.lightsOn = true;
    this.loggedIn = false;
    this.admin = false;
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

  isAdmin(): boolean {
    return this.admin;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
