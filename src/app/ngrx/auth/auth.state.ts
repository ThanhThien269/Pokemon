import { AuthUserModel } from '../../models/auth.model';

export interface AuthState {
  token: string | null; // JWT token
  refreshToken: string | null; // Refresh token
  user: AuthUserModel | null; // Thông tin người dùng

  // Đăng nhập
  isLoggingIn: boolean; // Trạng thái đang xử lý đăng nhập
  isLoginSuccess: boolean; // Trạng thái đăng nhập thành công
  loginErrorResponse: string | null;

  // Đăng ký
  isSigningUp: boolean; // Trạng thái đang xử lý đăng ký
  isSignUpSuccess: boolean; // Trạng thái đăng ký thành công
  signUpErrorResponse: string | null;

  // Đăng xuất
  isLoggingOut: boolean; // Trạng thái đang xử lý đăng xuất
  isLogoutSuccess: boolean; // Trạng thái đăng xuất thành công
  logoutErrorResponse: string | null;
}
