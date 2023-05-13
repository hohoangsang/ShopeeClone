import { AuthResponse } from 'src/types/auth.type';
import api from './api';

export const registerAccount = (body: { email: string; password: string }) => {
  return api.post<AuthResponse>('/register', body);
};

export const loginAccount = (body: { email: string; password: string }) => {
  return api.post<AuthResponse>('/login', body);
};
