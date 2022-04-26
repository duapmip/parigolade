import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  // This guard is used to recognize a user who have already logged in in previous session. However, it does not work yet.

  constructor(
    public router: Router,
    public authService: AuthService,
    ) {}


  canActivate(): boolean {  
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('tablinks/tablinks/home', {replaceUrl: true});
    } else {      
      return true;
    }
  }
}
