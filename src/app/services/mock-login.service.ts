import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const users: User[] = [
  {
    name: 'Denys',
    surname: 'Lazorchyk',
    role: 'administrator',
    login: 'denysLazorchyk',
    password: 'password',
    id: '1',
  },
  {
    name: 'John',
    surname: 'Smith',
    role: 'user',
    login: 'crido.admin',
    password: 'TopSecret',
    id: '2',
  },
  {
    name: 'Adam',
    surname: 'Śnieg',
    role: 'user',
    login: 'adamSnow',
    password: '42424242',
    id: '3',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MockLoginService {
  constructor() {}

  checkAuthentication(login: string, password: string) {
    let responseCode: number | undefined = undefined;
    let userId: number;
    users.map((user, index) => {
      if (user.login === login && user.password === password) {
        responseCode = 200;
        userId = index;
      }
    });

    return new Observable((sub) => {
      setTimeout(() => {
        if (responseCode) {
          sub.next({
            responseCode,
            jwt: this.makeJWT(27),
            user: users[userId],
          });
        } else {
          sub.next({ responseCode: 401 });
        }
        sub.complete();
      }, 1000);
    });
  }

  private makeJWT(length: number) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
