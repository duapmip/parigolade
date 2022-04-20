import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService,
    ) {}


  canActivate(): boolean {  
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/login', {replaceUrl: true});
      
      return false;
    }
  }
}