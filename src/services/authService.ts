import { publicApi } from '../api/axios';

interface LoginCredentials {
  phone: string;
  password: string;
}

interface PasswordResetRequest {
  phone: string;
}

interface OTPVerificationRequest {
  otp: string;
  phone: string;
}

interface PasswordResetData {
  password: string;
  phone: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    return await publicApi.post('/users/login', credentials);
  },

  async requestPasswordReset(data: PasswordResetRequest) {
    return await publicApi.post('/users/password-reset/request', data);
  },

  async verifyOTP(data: OTPVerificationRequest) {
    return await publicApi.post('/users/password-reset/validate-otp', data);
  },

  async resetPassword(data: PasswordResetData) {
    return await publicApi.post('/users/password-reset/reset', data);
  }
};
