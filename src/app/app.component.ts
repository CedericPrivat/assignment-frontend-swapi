import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { takeWhile, filter, mapTo } from 'rxjs/operators';

@Component({
  selector: 'swapi-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isRouting$!: Observable<boolean>;
  protected alive = true;

  constructor(private _router: Router) {
    this._setupSplashScreen();
  }

  ngOnDestroy = () => this.alive = false;

  private _setupSplashScreen() {
    const navigationStart$ = this._router.events.pipe(
      takeWhile(() => this.alive),
      filter(event => event instanceof NavigationStart),
      mapTo(true)
    );

    const navigationEnd$ = this._router.events.pipe(
      takeWhile(() => this.alive),
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError),
      mapTo(false)
    );

    this.isRouting$ = merge(navigationStart$, navigationEnd$);
  }
}
