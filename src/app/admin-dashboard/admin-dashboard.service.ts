import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}

  getUsersData() {
    return this.http
      .get('http://localhost:3000/user/admin', { withCredentials: true })
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
