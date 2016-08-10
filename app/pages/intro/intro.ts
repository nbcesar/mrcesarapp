import {NavController, LoadingController, Slides, Storage, LocalStorage} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators} from '@angular/common';
import {ProfileData} from '../../providers/profile-data/profile-data';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/intro/intro.html',
  providers: [ProfileData]
})
export class IntroPage {
  @ViewChild('introSlider') slider: Slides;

  userProfile: any;
  local: Storage;
  public firstName: string = null;
  public lastName: string = null;
  public gpaScale: string = null;
  public gpaScore: number = null;
  public testType: string = null;
  public actCompositeScore: number = null;
  public satVerbal: number = null;
  public satMath: number = null;

  constructor(public nav: NavController, public profileData: ProfileData,
    public loadingCtrl: LoadingController) {
    this.local = new Storage(LocalStorage);

    this.profileData.getUserProfile().on('value', profile => {
      this.userProfile = profile.val();
    });

  }

  nextSlide(){
    this.slider.update();
    this.slider.slideNext();
  }

  createProfile(event){
    if (this.userProfile.firstName || this.userProfile.lastName || this.userProfile.gpaScale
      || this.userProfile.testType){
        this.local.set('introShown', true);
        this.nav.setRoot(TabsPage);
    } else {
      this.profileData.createProfile(this.firstName, this.lastName, this.gpaScale, this.gpaScore,
        this.testType, this.actCompositeScore, this.satVerbal, this.satMath).then((profile) => {
          this.local.set('introShown', true);
          this.nav.setRoot(TabsPage);
        }, (error) => {
          console.log(error);
        });

        let loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        loading.present();
    }
  }

}
