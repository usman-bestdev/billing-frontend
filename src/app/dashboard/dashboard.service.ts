import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}

  getAllRoutes() {
    return this.http
      .get('http://localhost:3000/route', { withCredentials: true })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this._snackbar.open(err.error.message, '', {
            panelClass: ['snack_danger'],
          });
        }),
        finalize(() => {})
      );
  }
  getUserTokenRecord() {
    return this.http
      .get('http://localhost:3000/user-token', { withCredentials: true })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this._snackbar.open(err.error.message, '', {
            panelClass: ['snack_danger'],
          });
        }),
        finalize(() => {})
      );
  }
  invokeToken(id: number) {
    let data: any = { routeId: id };
    return this.http
      .post('http://localhost:3000/user-token', data, { withCredentials: true })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this._snackbar.open(err.error.message, '', {
            panelClass: ['snack_danger'],
          });
        }),
        finalize(() => {})
      );
  }

  addToken(token: { token: number }) {
    let data: any = token;
    return this.http
      .post('http://localhost:3000/user-token/add', data, {
        withCredentials: true,
      })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this._snackbar.open(err.error.message, '', {
            panelClass: ['snack_danger'],
          });
        }),
        finalize(() => {})
      );
  }
}
