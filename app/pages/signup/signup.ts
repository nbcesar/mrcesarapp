import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { IntroPage } from '../intro/intro';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
  public signupForm: any;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signupUser(event){
    event.preventDefault();
    this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
      this.nav.setRoot(IntroPage);
    }, (error) => {
      var errorMessage: string;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "There's an account with that email address";
          break;
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "You can't use this signup method, try social?";
          break;
        case "auth/weak-password":
          errorMessage = "You need a stronger password, don't get hacked!";
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


    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    loading.present();
  }
}
