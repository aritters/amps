import { Component } from '@angular/core';

import { MenuItem } from './shared/models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: MenuItem[] = [
    { path: '/dashboard', icon: 'dashboard', title: 'Dashboard' }
  ];

  constructor() {
  }
}
