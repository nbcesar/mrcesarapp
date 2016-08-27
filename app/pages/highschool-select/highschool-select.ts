import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HighschoolData } from '../../providers/highschool-data/highschool-data';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'build/pages/highschool-select/highschool-select.html',
  providers: [HighschoolData, ProfileData]
})
export class HighschoolSelectPage {
  public userProfile: any;
  public state: string;
  public cityList: any;
  public schoolList: any;
  public loadedSchoolList: any;
  public showList: boolean = false;
  public showSearch: boolean = false;
  public pickCity: boolean = false;

  constructor(public navCtrl: NavController, public highschoolData: HighschoolData,
    public profileData: ProfileData, public loadingCtrl: LoadingController) {

    this.profileData.getUserProfile().on('value', profile => {
      this.userProfile = profile.val();
    });

  }

  getCityList(state){
    this.state = state;
    this.pickCity = true;
    this.highschoolData.getCityList(state).on('value', snapshot => {
      let cities = [];
      snapshot.forEach( snap => {
        cities.push({
          id: snap.key,
          name: snap.val().name
        });
      });
      this.cityList = cities;
    });
  }

  getSchoolList(city){
    this.highschoolData.getSchoolList(this.state, city).on('value', snapshot => {
      let schools = [];
      snapshot.forEach( snap => {
        schools.push({
          id: snap.key,
          city: snap.val().city,
          name: snap.val().name,
          state: snap.val().state
        });
      });
      this.schoolList = schools;
      this.loadedSchoolList = schools;
      this.showSearch = true;
    });
  }

  initializeItems(){
    this.schoolList = this.loadedSchoolList;
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

    this.schoolList = this.schoolList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.schoolList.length);
  }

  addSchool(state, city, schoolName, schoolId){
    this.highschoolData.addSchool(state, city, schoolName, schoolId).then(() => {
      loading.dismiss().then( () => {
        this.navCtrl.pop().then( () => {
          this.navCtrl.pop();
        });
      });
    });

    let loading = this.loadingCtrl.create();
    loading.present();
  }

}
