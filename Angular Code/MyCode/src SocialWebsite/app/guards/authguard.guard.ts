import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(public router:Router) { }

  canActivate():boolean {
    if(localStorage.getItem('token')) {
      return true;
    }else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }
  
}
