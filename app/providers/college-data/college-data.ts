import {Injectable, Inject} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class CollegeData {
  public fireCollege: any;
  public userProfile: any;
  public currentUser: any;

  constructor() {
    this.fireCollege = firebase.database().ref('/updatedColleges');
    this.userProfile = firebase.database().ref('/userProfile');
    this.currentUser = firebase.auth().currentUser;
  }

  getCollegeList(): any {
    return this.userProfile.child(this.currentUser.uid).child('colleges').orderByChild('gradRate');
  }

  getMoonshotList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('moonshot')
      .orderByChild('gradRate');
  }

  getReachList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('reach')
      .orderByChild('gradRate');
  }

  getTargetList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('target')
      .orderByChild('gradRate');
  }

  getSafetyList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('safety')
      .orderByChild('gradRate');
  }

  getCunyList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('state')
      .child('NY').orderByChild('subHeading').equalTo('CUNY');
  }

  getSunyList(): any {
    return this.userProfile.child(this.currentUser.uid).child('filteredColleges').child('state')
      .child('NY').orderByChild('subHeading').equalTo('SUNY');
  }

  getOtherCollegeList(): any {
    return this.userProfile.child(this.currentUser.uid).child('colleges').orderByChild('admissibility')
      .equalTo('other');
  }

  addCollegeFavorite(collegeId: string): any {
    return this.userProfile.child(this.currentUser.uid).child('colleges').child(collegeId).update({
      favorite: true
    });
  }

  removeCollegeFavorite(collegeId: string): any {
    return this.userProfile.child(this.currentUser.uid).child('colleges').child(collegeId).child('favorite')
      .set(null);
  }

  getFavoriteCollege(): any {
    return this.userProfile.child(this.currentUser.uid).child('colleges')
      .orderByChild('favorite').equalTo(true);
  }

  getCollegeDetail(collegeId): any {
    return this.fireCollege.child(collegeId);
  }
}
