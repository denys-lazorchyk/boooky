import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  name: string;
  role: string;

  constructor() {
    this.name = 'John Smith';
    this.role = 'User';
  }

  ngOnInit(): void {}
}
