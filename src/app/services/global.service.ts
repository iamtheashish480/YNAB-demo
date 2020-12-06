import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isBrowser: boolean = false;   // check browser
  public isMobile: boolean = false;   // check the device is mobile
public isLoggedIn:boolean=false;  // check user is loggedin or not
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone,) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.detectDevice(null);
      window.onresize = (e) => {
        //ngZone.run will help to run change detection
        this.ngZone.run(() => {
          this.detectDevice(window.innerWidth);
        });
      }
        let isLogged = localStorage.getItem('isLoggedIn');
        if (isLogged) {
            this.isLoggedIn = true;
        }
      }
  }
  private detectDevice(width: number): void {
    let windowWidth = width || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth <= 767)
      this.isMobile = true;
    else {
      var body = document.getElementsByTagName('body')[0];
      this.isMobile = false;
      if (body && body.classList.contains('sidebar-active'))
        body && body.classList.remove('sidebar-active');
    }
  }
}
