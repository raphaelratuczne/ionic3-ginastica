import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController, private authService: AuthService) { }

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
