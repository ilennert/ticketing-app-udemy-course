import { Component } from '@angular/core';

import { LoggedInService } from './auth/services/is-logged-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userService: LoggedInService) { }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
