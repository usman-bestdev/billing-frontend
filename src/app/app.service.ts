import { map, catchError, finalize, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private _snackbar: MatSnackBar,
    public router: Router
  ) {}
  navBarData: BehaviorSubject<any> = new BehaviorSubject(null);

  getUserData() {
    return this.http
      .get('http://localhost:3000/user', { withCredentials: true })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this.handleError(err);
        }),
        finalize(() => {})
      );
  }
  handleError(err: any) {
    if (err.error.statusCode == 444) {
      this.router.navigateByUrl('/login');
    } else
      this._snackbar.open(err.error.message, '', {
        panelClass: ['snack_danger'],
      });
  }
}
