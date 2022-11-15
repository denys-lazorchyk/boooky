export interface User {
  login: string;
  password: string;
  details: UserShort;
}

export interface UserShort {
  name: string;
  surname: string;
  role: 'user' | 'admin';
  id: string;
}
