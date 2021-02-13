import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authguard2Guard implements CanActivate {
  constructor(public router:Router) { }

  canActivate():boolean {
    if(!localStorage.getItem('token')) {
      return true;
    }else {
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
