import {Injectable, Inject} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class HighschoolData {
  public fireSchool: any;
  public userProfileRef: any;
  public currentUser: any;

  constructor() {
    this.fireSchool = firebase.database().ref('/highSchools');
    this.userProfileRef = firebase.database().ref('/userProfile/');
    this.currentUser = firebase.auth().currentUser;
  }

  getStateList(): any {
    return this.fireSchool;
  }

  getCityList(state): any {
    return this.fireSchool.child(state);
  }

  getSchoolList(state, city): any {
    return this.fireSchool.child(state).child(city).child('schoolList');
  }

  addSchool(state, city, schoolName, schoolId): any {
    let updates = {};

    this.fireSchool.child(state).child(city).child('schoolList').child(schoolId)
      .child('students').child(this.currentUser.uid).set(true);

    updates[this.currentUser.uid + '/highSchool/city'] = city;
    updates[this.currentUser.uid + '/highSchool/name'] = schoolName;
    updates[this.currentUser.uid + '/highSchool/state'] = state;
    updates[this.currentUser.uid + '/highSchool/id'] = schoolId;

    return this.userProfileRef.update(updates);

  }

}
