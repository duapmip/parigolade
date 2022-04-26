import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-championship',
  templateUrl: 'championship.page.html',
  styleUrls: ['championship.page.scss'],
})
export class ChampionshipPage {

  bets = [];

  constructor(
    private dataService: DataService, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
    ) {
    this.authService.getUser()
  }


}
