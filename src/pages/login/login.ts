import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

// import { User } from '../../providers';
// import { MainPage } from '../';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  // account: { email: string, password: string } = {
  //   email: 'test@example.com',
  //   password: 'test'
  // };

  // Our translated text strings
  // private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    // public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private authService: AuthService
  ) {
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // })
    this.authService.autenticou().subscribe(ok => {
      if (ok)
        this.navCtrl.push('DashboardPage');
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
    this.navCtrl.push('DashboardPage');
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle()
      .then(
        () => this.navCtrl.push('DashboardPage'),
        error => console.log(error.message)
      );
  }

}
