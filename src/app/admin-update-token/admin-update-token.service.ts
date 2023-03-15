import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminUpdateTokenService {
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}

  getRoutesData() {
    return this.http
      .get('http://localhost:3000/route/admin', { withCredentials: true })
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

  updateRouteCost(id: number, cost: number) {
    let params: any = { id, cost };
    return this.http
      .put('http://localhost:3000/route/admin', params, {
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
