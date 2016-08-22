import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any;
  public loading: any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  loginUser(event){
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    .then((authData) => {
        this.nav.setRoot(TabsPage);
    }, (error) => {
      this.loading.dismiss();
      var errorMessage: string;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to enter a valid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "Your user has been disabled";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found. Try again or create a new account";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong mix of user/password";
          break;
        default:
          errorMessage = error.message;
      }

      let alert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [{text: "Ok"}]
      });
      alert.present();
  });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }
}
