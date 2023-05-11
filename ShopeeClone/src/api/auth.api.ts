import { RegisterResponse } from 'src/types/auth.type';
import api from './api';

export const registerAccount = (body: { email: string; password: string }) => {
  return api.post<RegisterResponse>('/register', body);
};
