import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HighschoolData } from '../../providers/highschool-data/highschool-data';
import { ProfileData } from '../../providers/profile-data/profile-data';

@Component({
  templateUrl: 'build/pages/highschool-select/highschool-select.html',
  providers: [HighschoolData, ProfileData]
})
export class HighschoolSelectPage {
  public userProfile: any;
  public schoolList: any;
  public loadedSchoolList: any;
  public showList: boolean = false;
  public showSearch: boolean = false;

  constructor(private nav: NavController, private highschoolData: HighschoolData,
    private profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', profile => {
      this.userProfile = profile.val();
    });

  }

  getSchoolList(schoolState){
    this.highschoolData.getSchoolList(schoolState).on('value', snapshot => {
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
      this.nav.pop();
    });
  }

}
