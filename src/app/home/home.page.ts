import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  bets = [];

  constructor(
    private dataService: DataService, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
    ) {
    this.dataService.getBet().subscribe(res => {
      this.bets = res;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true})
  }

  async openBet(bet) {
    // function to open details on  a bet
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: bet.id },
      breakpoints: [0, 0.38, 0.6],
      initialBreakpoint: 0.38
    });
    modal.present();
  }

  async addBet() {
    const alert = await this.alertCtrl.create({
      header: 'Add Bet',
      inputs: [
        {
          name:'title',
          placeholder: 'Nom de mon pari',
          type: 'text'
        },
        {
          name: 'betNumber',
          placeholder: 'Cote',
          type: 'number'
        },
        {
          name: 'set',
          placeholder: 'Mise',
          type: 'number'
        },
        {
          name: 'choices',
          placeholder: 'Les choix (choix 1, choix 2, choix 3, etc)',
          type: 'textarea'
        },
        {
          name: 'league',
          placeholder: 'La ligue du pari',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addBet({title : res.title, betNumber: res.betNumber, set: res.set, choices: res.choices, league: res.league});
            // trying to update the league when adding new bet
            // this.dataService.updateLeague({bets.Add})
          }
        }
      ]
    });
    await alert.present();
  }

}
