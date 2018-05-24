import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.authService.autenticou().subscribe(ok => {
      if (!ok)
        this.navCtrl.push('LoginPage');
    });
  }

  // ionViewDidEnter() {
  //   if (this.authService.authenticated) {
  //     this.navCtrl.push('LoginPage');
  //   }
  // }

  listaAulas() {
    this.navCtrl.push('AulasPage');
  }

  config() {
    this.navCtrl.push('TabsPage');
  }

  logout() {
    this.authService.signOut().then(() => {this.navCtrl.push('LoginPage')});
  }
}
