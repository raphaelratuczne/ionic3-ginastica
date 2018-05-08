import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController) { }

  listaAulas() {
    this.navCtrl.push('AulasPage');
  }

  config() {
    this.navCtrl.push('TabsPage');
  }
}
