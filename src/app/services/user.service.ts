import { Injectable } from '@angular/core';
import { UserShort } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: UserShort;

  constructor() {}

  public set user(user: UserShort) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this._user = user;
  }

  public get user() {
    let userSession = sessionStorage.getItem('user');

    if (userSession) {
      this._user = JSON.parse(userSession);
    }

    return this._user;
  }

  public clearUser() {
    sessionStorage.removeItem('user');
  }
}
