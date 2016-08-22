import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {CollegePage} from '../college/college';
import {CollegeData} from '../../providers/college-data/college-data';

@Component({
  templateUrl: 'build/pages/anonymous-search/anonymous-search.html',
  providers: [CollegeData]
})
export class AnonymousSearchPage {
  collegeList: any;
  loadedCollegeList: any;
  searchQuery: string;
  showList: boolean;

  constructor(public nav: NavController, public collegeData: CollegeData,
    public navParams: NavParams, public alertCtrl: AlertController) {

      this.searchQuery = '';

      if (this.navParams.get('showList') == true) {
        this.showList = true;
      } else {
        this.showList = false;
      }


      if (typeof this.navParams.get('admissibility') == 'undefined') {
        this.collegeData.getCollegeList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.push({
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
        });
      } else if (this.navParams.get('admissibility') == 'moonshot') {
        this.collegeData.getMoonshotList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.push({
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
        });
      } else if (this.navParams.get('admissibility') == 'reach') {
        this.collegeData.getReachList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.push({
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
        });
      } else if (this.navParams.get('admissibility') == 'target') {
        this.collegeData.getTargetList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.push({
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
        });
      } else if (this.navParams.get('admissibility') == 'safety') {
        this.collegeData.getSafetyList().once('value').then(collegeList => {
          let colleges = [];
          collegeList.forEach( college => {
            colleges.push({
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
    this.showList = true;


    // if the value is an empty string don't filter the items
    if (!q) {
      this.showList = false;
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
    console.log("Nice try");
  }

}
