import {NavController, LoadingController, Slides} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {AnonymousSearchPage} from '../anonymous-search/anonymous-search';
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

  constructor(public nav: NavController, public authData: AuthData,
    public loadingCtrl: LoadingController) {}

  nextSlide(){
    // this.slider.update();
    this.slider.slideNext();
  }

  createAnonymousUser(){
    let nextSlide = this.slider.slideNext();
    if (this.authData.currentUser()){
      nextSlide;
    } else {
      this.authData.createAnonymousUser(this.gpaScale, this.gpaScore, this.testType,
        this.actCompositeScore, this.satVerbal, this.satMath, this.race).then((authData) => {
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

  }

  goToAnonymousSearch(){
    this.nav.setRoot(AnonymousSearchPage);
  }

}
