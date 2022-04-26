import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';

export const INTRO_KEY = 'intro-seen';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  // this guard is used to control whether the user have already seen the intro page. If not, it shows the intro page, else it redirects to the login page.

  constructor(private router: Router) {}

  async canActivate() : Promise<boolean> {
    const hasSeenIntro = await Storage.get({key: INTRO_KEY})

    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return true;
    }
  }
}
