import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CollegePage } from '../college/college';
import { SignupPage } from '../signup/signup';
import { CollegeData } from '../../providers/college-data/college-data';

@Component({
  templateUrl: 'build/pages/anonymous-search-filtered/anonymous-search-filtered.html',
  providers: [CollegeData]
})
export class AnonymousSearchFilteredPage {
  collegeList: any;
  loadedCollegeList: any;
  searchQuery: string;
  showList: boolean = true;
  loadingWait: any;
  category: string;

  constructor(public nav: NavController, public collegeData: CollegeData,
    public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      let loading = this.loadingCtrl.create({
        duration: 3000,
        content: "Give me a sec to think about it"
      });
      loading.present();
      this.searchQuery = '';
      console.log("Not yet!");

      if (this.navParams.get('admissibility') == 'moonshot') {
        this.category = 'Moonshot';
        this.collegeData.getMoonshotList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.unshift({
              id: college.key,
              name: college.val().name,
              state: college.val().state,
              city: college.val().city,
              displayName: college.val().displayName,
              subHeading: college.val().subHeading,
              gradRate: college.val().gradRate,
              retentionRate: college.val().retentionRate,
              admitRate: college.val().admitRate,
              admissibility: college.val().admissibility,
              favorite: college.val().favorite
            });
          });
          this.collegeList = colleges;
          this.loadedCollegeList = colleges;
          console.log(colleges.length);

        });
      } else if (this.navParams.get('admissibility') == 'reach') {
        this.category = 'Reach';
        this.collegeData.getReachList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.unshift({
              id: college.key,
              name: college.val().name,
              state: college.val().state,
              city: college.val().city,
              displayName: college.val().displayName,
              subHeading: college.val().subHeading,
              gradRate: college.val().gradRate,
              retentionRate: college.val().retentionRate,
              admitRate: college.val().admitRate,
              admissibility: college.val().admissibility,
              favorite: college.val().favorite
            });
          });
          this.collegeList = colleges;
          this.loadedCollegeList = colleges;
          console.log(colleges.length);

        });
      } else if (this.navParams.get('admissibility') == 'target') {
        this.category = 'Target';
        this.collegeData.getTargetList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.unshift({
              id: college.key,
              name: college.val().name,
              state: college.val().state,
              city: college.val().city,
              displayName: college.val().displayName,
              subHeading: college.val().subHeading,
              gradRate: college.val().gradRate,
              retentionRate: college.val().retentionRate,
              admitRate: college.val().admitRate,
              admissibility: college.val().admissibility,
              favorite: college.val().favorite
            });
          });
          this.collegeList = colleges;
          this.loadedCollegeList = colleges;
          console.log(colleges.length);

        });
      } else if (this.navParams.get('admissibility') == 'safety') {
        this.category = 'Safety';
        this.collegeData.getSafetyList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.unshift({
              id: college.key,
              name: college.val().name,
              state: college.val().state,
              city: college.val().city,
              displayName: college.val().displayName,
              subHeading: college.val().subHeading,
              gradRate: college.val().gradRate,
              retentionRate: college.val().retentionRate,
              admitRate: college.val().admitRate,
              admissibility: college.val().admissibility,
              favorite: college.val().favorite
            });
          });
          this.collegeList = colleges;
          this.loadedCollegeList = colleges;
          console.log(colleges.length);

        });
      }

  }

  initializeItems(){
    this.collegeList = this.loadedCollegeList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;



    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.collegeList = this.collegeList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.collegeList.length);

  }

  goToCollege() {
    let alert = this.alertCtrl.create({
      message: "If you want to continue you'll need to provide an email and create a password",
      buttons: [
        { text: "Cancel" },
        {
          text: "OK",
          handler: data => {
            this.nav.push(SignupPage);
          }
        }
      ]
    });
    alert.present();
  }

}
