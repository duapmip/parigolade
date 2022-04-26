import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from '../guards/intro.guard';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    // function to look if the user uses the app for the first time or not. If it is the first time then the intro is displayed.
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
