// src/app/store/auth/auth.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { setToken, loginFailure, registerFailure } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../environments/environment'; // Đảm bảo import đúng đường dẫn

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}
}
