import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage, Platform, ItemSliding } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { CollegePage } from '../college/college';
import { CollegeData } from '../../providers/college-data/college-data';



@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [CollegeData]
})
export class ListPage {
  public moonshotList: any = [];
  public reachList: any = [];
  public targetList: any = [];
  public safetyList: any = [];
  public otherList: any = [];
  public local: Storage;
  public collegeCategory: string = 'moonshot';
  isAndroid: boolean = false;
  isWindows: boolean = false;

  constructor(public nav: NavController, platform: Platform, public collegeData: CollegeData) {
    this.isAndroid = platform.is('android');
    this.isWindows = platform.is('windows');
    this.local = new Storage(LocalStorage);

    this.getFavoriteCollegeList();
  }

  getFavoriteCollegeList(){
    this.collegeData.getFavoriteCollege().on('value', favoriteCollegeList => {
      let moonshotList = [];
      let reachList = [];
      let targetList = [];
      let safetyList = [];
      let otherList = [];
      favoriteCollegeList.forEach( college => {
        if (college.val().admissibility == 'Moonshot') moonshotList.push(college.val());
        else if (college.val().admissibility == 'Reach') reachList.push(college.val());
        else if (college.val().admissibility == 'Target') targetList.push(college.val());
        else if (college.val().admissibility == 'Safety') safetyList.push(college.val());
        else otherList.push(college.val());
      });
      this.moonshotList = moonshotList;
      this.reachList = reachList;
      this.targetList = targetList;
      this.safetyList = safetyList;
      this.otherList = otherList;

    });
  }

  goToCollegeDetail(collegeId, admissibility){
    this.nav.push(CollegePage, {
      collegeId: collegeId,
      admissibility: admissibility,
      favoriteCollege: true,
      canUpdate: true
    });
  }

  goToSearch(){
    this.nav.push(SearchPage);
  }

  goToProfile(){
    this.nav.push(ProfilePage);
  }

  removeCollegeAsFavorite(collegeId, slidingItem: ItemSliding, index) {
    slidingItem.close();
    // Remove college from favorite
    this.collegeData.removeCollegeFavorite(collegeId).then( () => {
      this.moonshotList.splice(index, 1);
    });
  }

}
