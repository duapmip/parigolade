import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-league',
  templateUrl: 'league.page.html',
  styleUrls: ['league.page.scss'],
})
export class LeaguePage {

  leagues= [];

  constructor(
    private dataService: DataService, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
    ) {
    this.dataService.getLeague().subscribe(res => {
      this.leagues = res;
    })
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true})
  }

  // async openLeague(league) {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalPage,
  //     componentProps: { id: league.idLeague },
  //     breakpoints: [0, 0.5, 0.8],
  //     initialBreakpoint: 0.5
  //   });
  //   modal.present();
  // }
  
  // async recupBet(league) {
  //   var bets;
  //   this.dataService.getBet().subscribe(res => {
  //     bets = res;
  //     if (bets.league == league){
  //       return bets;
  //     }
  //     else{
  //       return false;
  //     }
  //   });
  // }

  async addLeague() {
    const alert = await this.alertCtrl.create({
      header: 'Add League',
      inputs: [
        {
          name:'titleLeague',
          placeholder: 'Titre de la ligue',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addLeague({titleLeague : res.titleLeague, bets: null, admin : this.authService.getUser(), participantsNumber: 1});
          }
        }
      ]
    });
    await alert.present();
  }

}
