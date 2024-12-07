import { AuthUserModel } from './../../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  logoutStart,
  registerStart,
  setToken,
} from '../../ngrx/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private authenticatedSub = new Subject<boolean>();

  getAuthenticatedSub() {
    return this.authenticatedSub.asObservable();
  }
  private token!: string;
  getToken(): string {
    return this.token;
  }
  register(email: string, password: string): void {
    const authData: AuthUserModel = {
      email: email,
      password: password,
    };
    this.http
      .post(
        `${environment.baseUrl}/${environment.baseVersion}/auth/register`,
        authData
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  login(username: string, password: string): void {
    const authData: any = {
      username: username,
      password: password,
    };
    this.http
      .post(
        `${environment.baseUrl}/${environment.baseVersion}/auth/login`,
        authData
      )
      .subscribe((response: any) => {
        console.log(response);
        this.token = response.access_token;
        if (this.token) {
          this.authenticatedSub.next(true);
        }
      });
  }
  // login(email: string, password: string): Observable<any> {
  //   return this.http
  //     .post(`${environment.baseUrl}/${environment.baseVersion}/auth/login`, {
  //       email,
  //       password,
  //     })
  //     .pipe(
  //       // Sau khi đăng nhập thành công, lưu token và refreshToken vào store
  //       map((response: any) => {
  //         this.store.dispatch(
  //           setToken({
  //             token: response.access_token,
  //             refreshToken: response.refresh_token,
  //           })
  //         );
  //         return response;
  //       })
  //     );
  // }
  // register(email: string, username: string, password: string): Observable<any> {
  //   return this.http.post(`${environment.baseUrl}/auth/register`, {
  //     email,
  //     username,
  //     password,
  //   });
  // }
  // logout() {
  //   // Khi logout, gọi action logout để xóa token
  //   this.store.dispatch(logoutStart());
  // }
}
