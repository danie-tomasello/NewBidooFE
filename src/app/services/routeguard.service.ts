import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthappService } from './authapp.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) { 
    
    return this.auth.isLogged();
  }

  constructor(private auth: AuthappService) { }
}
  