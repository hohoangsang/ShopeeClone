type Role = 'Admin' | 'User';

export interface User {
  roles: Role[];
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
