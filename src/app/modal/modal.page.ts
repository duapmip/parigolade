import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Bet } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  bet: Bet = null;

  constructor(private dataService: DataService, private modalCrtl: ModalController,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    this.dataService.getBetById(this.id).subscribe(res => {
      this.bet = res;
    });
  }

  // Need to implement administrator's function, nonetheless already working

  // async updateBet() {
  //   this.dataService.updateBet(this.bet);
  //   const toast = await this.toastCtrl.create({
  //     message: 'Bet updated!',
  //     duration: 1000
  //   });
  //   toast.present();
  // }

  // async deleteBet() {
  //   await this.dataService.deleteBet(this.bet);
  //   this.modalCrtl.dismiss();
  // }

  async gotoleague() {
    // function to go to league tab
    this.router.navigateByUrl('tablinks/tablinks/league', {replaceUrl: true});
    this.modalCrtl.dismiss();
  }
}
