export interface User {
  name: string;
  surname: string;
  role: 'user' | 'administrator';
  login: string;
  password: string;
  id: string;
}
