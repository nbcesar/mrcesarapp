import { NavController, LoadingController, AlertController, Storage, LocalStorage } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TabsPage } from '../tabs/tabs';
import { IntroPage } from '../intro/intro';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData, ProfileData]
})
export class LoginPage {
  public loginForm: any;
  public userProfile: any;
  local: Storage;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public profileData: ProfileData) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.local = new Storage(LocalStorage);
  }

  loginUser(event){
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    .then((authData) => {
      this.local.get('introShown').then((introShown) => {
        if (introShown) {
          this.nav.setRoot(TabsPage);
        } else {
          this.profileData.getProfile(authData.uid).on('value', profile => {
            if (profile.val().firstName || profile.val().lastName){
              this.nav.setRoot(TabsPage);
            } else {
              this.nav.setRoot(IntroPage);
            }
          });
        }
      });
    }, (error) => {
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

    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    loading.present();
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }
}
