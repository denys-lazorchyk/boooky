import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  name!: string;
  role!: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.user) {
      this.name = `${this.userService.user.name} ${this.userService.user.surname}`;
      this.role = this.userService.user.role;
    } else {
      this.logOut();
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
