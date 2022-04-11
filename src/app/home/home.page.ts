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
      console.log(res);
      this.bets = res;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true})
  }

  async openBet(bet) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: bet.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  async addBet() {
    const alert = await this.alertCtrl.create({
      header: 'Add Bet',
      inputs: [
        {
          name:'title',
          placeholder: 'My cool bet',
          type: 'text'
        },
        {
          name: 'betNumber',
          placeholder: 'How much risk you are ready to take',
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
            this.dataService.addBet({title : res.title, betNumber: res.betNumber});
          }
        }
      ]
    });
    await alert.present();
  }

}
