import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { IntroPage } from '../intro/intro';

@Component({
  templateUrl: 'build/pages/landing/landing.html',
})
export class LandingPage {

  constructor(private navCtrl: NavController) {

  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToIntro(){
    this.navCtrl.push(IntroPage, {
      isAnonymous: true
    });
  }

}
