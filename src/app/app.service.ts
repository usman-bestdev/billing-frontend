import { map, catchError, finalize, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}
  navBarData: BehaviorSubject<any> = new BehaviorSubject(null);

  getUserData() {
    return this.http
      .get('http://localhost:3000/user', { withCredentials: true })
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
