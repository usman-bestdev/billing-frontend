import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private subscription: Subscription = new Subscription();

  constructor(
    private app: AppService,
    private cookieService: CookieService,
    private _router: Router
  ) {
    this.subscription.add(
      this.app.navBarData.subscribe((value: Boolean) => {
        if (value) this.getUserRecord();
      })
    );
  }

  userData: any;
  ngOnInit(): void {
    this.getUserRecord();
  }
  getUserRecord() {
    this.app.getUserData().subscribe(
      (res) => {
        if (res) {
          this.userData = res;
        }
      },
      (err) => {}
    );
  }
  logout() {
    this.cookieService.deleteAll();
    this._router.navigateByUrl('/login');
  }
}
