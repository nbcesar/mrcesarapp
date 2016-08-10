import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/reset-password/reset-password.html',
  providers: [AuthData]
})
export class ResetPasswordPage {
  public resetPasswordForm: any;


  constructor(public authData: AuthData, public formBuilder: FormBuilder, public nav: NavController,
    public alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.required],
    })
  }

  resetPassword(event){
    event.preventDefault();
    this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
      let alert = this.alertCtrl.create({
        message: "We just sent you a reset link to your email",
        buttons: [{text: "Ok"}]
      });
      alert.present();;

    }, (error) => {
      var errorMessage: string;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "That user does not exist";
          break;
        default:
          errorMessage = error.message;
      }
      let alert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [{text: "Ok"}]
      });

      alert.present();;
    });
  }
}
