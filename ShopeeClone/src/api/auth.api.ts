import { AuthResponse } from 'src/types/auth.type';
import api from './api';

export const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return api.post<AuthResponse>('/register', body);
  },

  loginAccount: (body: { email: string; password: string }) => {
    return api.post<AuthResponse>('/login', body);
  },

  logoutAccount: () => {
    return api.post('/logout');
  }
};
