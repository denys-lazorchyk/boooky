import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  name: string;
  role: string;

  constructor(private authService: AuthService) {
    this.name = 'John Smith';
    this.role = 'User';
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
  }
}
