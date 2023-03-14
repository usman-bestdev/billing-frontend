import { map, catchError, finalize } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}
  login(loginData: any) {
    return this.http
      .post('http://localhost:3000/auth/login', loginData, {
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
