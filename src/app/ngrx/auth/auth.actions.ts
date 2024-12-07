import { createAction, props } from '@ngrx/store';
import { AuthUserModel } from '../../models/auth.model';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; refreshToken: string; user: AuthUserModel }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string; refreshToken: string }>()
);
// Đăng ký
export const registerStart = createAction(
  '[Auth] Register Start',
  props<{ email: string; username: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ message: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logoutStart = createAction('[Auth] Logout Start');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);
