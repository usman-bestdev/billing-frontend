import { map, catchError, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private app: AppService) {}
  login(loginData: any) {
    return this.http
      .post('http://localhost:3000/auth/login', loginData, {
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
