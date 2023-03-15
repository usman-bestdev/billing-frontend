import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    const cookieExist: Boolean = this.cookieService.check('accessToken');
    if (cookieExist) return true;
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
