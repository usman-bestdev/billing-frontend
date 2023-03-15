import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private app: AppService) {}

  getAllRoutes() {
    return this.http
      .get('http://localhost:3000/route', { withCredentials: true })
      .pipe(
        map((res) => res),
        catchError(async (err) => {
          this.app.handleError(err);
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
          this.app.handleError(err);
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
          this.app.handleError(err);
        }),
        finalize(() => {})
      );
  }
}
