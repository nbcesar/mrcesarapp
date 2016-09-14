import {NavController, LoadingController, Slides} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {AnonymousSearchPage} from '../anonymous-search/anonymous-search';
import { TabsPage } from '../tabs/tabs';
import { SearchPage } from '../search/search';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/intro/intro.html',
  providers: [AuthData]
})
export class IntroPage {
  @ViewChild('introSlider') slider: Slides;

  public isAnonymous: boolean = false;
  public gpaScale: string;
  public gpaScore: number;
  public testType: string;
  public actCompositeScore: number;
  public satVerbal: number;
  public satMath: number;
  public race: string;
  public state: string;

  public slideOneInvalid: boolean = false;
  public slideTwoInvalid: boolean = false;
  public slideThreeInvalid: boolean = false;

  constructor(public nav: NavController, public authData: AuthData,
    public loadingCtrl: LoadingController) {}

  nextSlide(){
    // this.slider.update();
    this.slider.slideNext();
  }

  createAnonymousUser(){
    let nextSlide = this.slider.slideNext();

    // validate all intro data. If missing, go to that slideNext

    // missing slideOne
    if (!this.gpaScale || !this.gpaScore) {
      console.log(this.gpaScale, this.gpaScore);
      this.slideOneInvalid = true;
      this.slider.slideTo(0,500);
    }
    // missing slideTwo
    else if (!this.testType || (!this.actCompositeScore && (!this.satVerbal || !this.satMath))) {
      this.slideTwoInvalid = true;
      this.slider.slideTo(1,500);
    }
    // missing slideThree
    else if (!this.state || !this.race) {
      this.slideThreeInvalid = true;
      this.slider.slideTo(2,500);
    }
    // all fields entered
    else {
      this.authData.createAnonymousUser(this.gpaScale, this.gpaScore, this.testType,
        this.actCompositeScore, this.satVerbal, this.satMath, this.race, this.state).then((authData) => {
          nextSlide;
          console.log(this.authData);
        }, (error) => {
          console.log(error);
        });

        let loading = this.loadingCtrl.create({
          content: "Calculating odds...",
          duration: 3000
        });
        loading.present();
    }

    /* // Old version
    if (this.authData.currentUser()){
      nextSlide;
    } else {
      this.authData.createAnonymousUser(this.gpaScale, this.gpaScore, this.testType,
        this.actCompositeScore, this.satVerbal, this.satMath, this.race, this.state).then((authData) => {
          nextSlide;
        }, (error) => {
          console.log(error);
        });

        let loading = this.loadingCtrl.create({
          content: "Calculating odds...",
          duration: 4000
        });
        loading.present();
    }
    */

  }

  goToAnonymousSearch(){
    this.nav.setRoot(AnonymousSearchPage);
  }

  goToHomePage() {
    this.nav.setRoot(TabsPage);
  }

}
