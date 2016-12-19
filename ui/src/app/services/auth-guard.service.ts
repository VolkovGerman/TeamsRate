import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

}