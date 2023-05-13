import { User } from './user.type';
import { ResponseType } from './utils.type';

export type AuthResponse = ResponseType<{
  access_token: string;
  expires: number;
  refresh_token: string;
  expires_refresh_token: number;
  user: User;
}>;
