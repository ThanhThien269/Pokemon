import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/auth.state';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { logoutStart, setToken } from '../ngrx/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class HttpClientAuth {
  private token: string = '';
  private refreshToken: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>
  ) {
    // Lấy token từ store
    this.store.select('auth').subscribe((authState) => {
      this.token = authState.token ?? '';
      this.refreshToken = authState.refreshToken ?? '';
    });
  }

  private transformRequest(url: string, options: any = {}) {
    const fullUrl = `${environment.baseUrl}/${environment.baseVersion}/${url}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      ...options.headers,
    });

    return { url: fullUrl, options: { ...options, headers } };
  }

  private refreshAccessToken(): Observable<string> {
    // Gửi yêu cầu làm mới token
    return this.http
      .post(`${environment.baseUrl}/${environment.baseVersion}/auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        map((response: any) => {
          const newToken = response.access_token;
          this.store.dispatch(
            setToken({
              token: newToken,
              refreshToken: '',
            })
          ); // Cập nhật token mới vào store
          return newToken;
        }),
        catchError((err) => {
          // Nếu làm mới token thất bại, logout
          this.store.dispatch(logoutStart());
          return throwError(() => new Error('Token refresh failed'));
        })
      );
  }

  private handleError(
    err: any,
    requestFn: () => Observable<any>
  ): Observable<any> {
    if (err.status === 401 && this.refreshToken) {
      // Nếu lỗi 401 (Unauthorized), làm mới token và retry request
      return this.refreshAccessToken().pipe(switchMap(() => requestFn()));
    }
    return throwError(() => err);
  }

  get(url: string, options?: any): Observable<any> {
    const { url: fullUrl, options: fullOptions } = this.transformRequest(
      url,
      options
    );
    return this.http
      .get(fullUrl, fullOptions)
      .pipe(
        catchError((err) => this.handleError(err, () => this.get(url, options)))
      );
  }

  post(url: string, body: any, options?: any): Observable<any> {
    const { url: fullUrl, options: fullOptions } = this.transformRequest(
      url,
      options
    );
    return this.http
      .post(fullUrl, body, fullOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, () => this.post(url, body, options))
        )
      );
  }

  put(url: string, body: any, options?: any): Observable<any> {
    const { url: fullUrl, options: fullOptions } = this.transformRequest(
      url,
      options
    );
    return this.http
      .put(fullUrl, body, fullOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, () => this.put(url, body, options))
        )
      );
  }

  delete(url: string, options?: any): Observable<any> {
    const { url: fullUrl, options: fullOptions } = this.transformRequest(
      url,
      options
    );
    return this.http
      .delete(fullUrl, fullOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, () => this.delete(url, options))
        )
      );
  }
}
