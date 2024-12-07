import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,

  isLoggingIn: false,
  isLoginSuccess: false,
  loginErrorResponse: null,

  isSigningUp: false,
  isSignUpSuccess: false,
  signUpErrorResponse: null,

  isLoggingOut: false,
  isLogoutSuccess: false,
  logoutErrorResponse: null,
};

export const authReducer = createReducer(
  initialState,

  // Đăng nhập
  on(AuthActions.loginStart, (state) => ({
    ...state,
    isLoggingIn: true,
    loginErrorResponse: null,
  })),
  on(AuthActions.loginSuccess, (state, { token, refreshToken, user }) => ({
    ...state,
    isLoggingIn: false,
    isLoginSuccess: true,
    token,
    refreshToken,
    user,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggingIn: false,
    loginErrorResponse: error,
  })),
  on(AuthActions.setToken, (state, { token, refreshToken }) => ({
    ...state,
    token,
    refreshToken,
  })),
  // Đăng ký
  on(AuthActions.registerStart, (state) => ({
    ...state,
    isSigningUp: true,
    signUpErrorResponse: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    isSigningUp: false,
    isSignUpSuccess: true,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isSigningUp: false,
    signUpErrorResponse: error,
  })),

  // Đăng xuất
  on(AuthActions.logoutStart, (state) => ({
    ...state,
    isLoggingOut: true,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isLoggingOut: false,
    isLogoutSuccess: true,
    token: null,
    refreshToken: null,
    user: null,
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    isLoggingOut: false,
    logoutErrorResponse: error,
  }))
);
