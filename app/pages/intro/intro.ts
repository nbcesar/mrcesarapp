import {NavController, LoadingController, AlertController, Slides} from 'ionic-angular';
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

  public gpaScale: string;
  public gpaScore: number;
  public testType: string;
  public actCompositeScore: number;
  public satVerbal: number;
  public satMath: number;
  public race: string;
  public state: string;
  public showButton: boolean = false;

  public slideOneInvalid: boolean = false;
  public slideTwoInvalid: boolean = false;
  public slideThreeInvalid: boolean = false;

  public loading: any;

  public oddsMessage: string = 'CALCULATING ODDS';

  constructor(public nav: NavController, public authData: AuthData,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    }

  nextSlide(){
    this.slider.slideNext();
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let previousIndex = this.slider.getPreviousIndex();

    if (previousIndex == 1 && currentIndex == 2) {
      if (!this.gpaScale || !this.gpaScore) {
        this.slideOneInvalid = true;
        this.slider.slideTo(1,500);
      }
      else {
        this.slideOneInvalid = false;
      }
    }
    else if (previousIndex == 2 && currentIndex == 3) {
      if (!this.testType || (!this.actCompositeScore && (!this.satVerbal || !this.satMath))) {
        this.slideTwoInvalid = true;
        this.slider.slideTo(2,500);
      }
      else {
        this.slideTwoInvalid = false;
      }
    }
    else if (previousIndex == 3 && currentIndex == 4) {
      if (!this.state || !this.race) {
        this.slideThreeInvalid = true;
        this.slider.slideTo(3,500);
      }
      else { // at last slide and validated
        this.slideThreeInvalid = false;

        this.loading = this.loadingCtrl.create({
          content: "Calculating odds..."
        });
        this.loading.present();

        // create anonymousUser
        this.authData.createAnonymousUser(this.gpaScale, this.gpaScore, this.testType, this.actCompositeScore, this.satVerbal, this.satMath, this.race, this.state).then((authData) => {
          this.loading.dismiss();
          this.oddsMessage = "All set!";
          this.showButton = true;
        }, (error) => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Oh no, something went wrong :(',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
        });
      }
    }
  }

  goToAnonymousSearch(){
    this.nav.setRoot(AnonymousSearchPage);
  }

  goToHomePage() {
    this.nav.setRoot(TabsPage);
  }

}
