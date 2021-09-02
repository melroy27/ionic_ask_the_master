import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { LocalStorage } from '../storage/local-storage';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, public lclStr: LocalStorage) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.lclStr.getDesignation() === 'employee') {
      return this.router.navigateByUrl('/main/user');
    }
    else if (this.lclStr.getDesignation() === 'master') {
      return this.router.navigateByUrl('/main/master')
    }
    else if (this.lclStr.getDesignation() === '')
      return this.router.navigateByUrl('/auth');
    console.log('You gotta try again')
  }

}
