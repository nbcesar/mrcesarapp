import {Injectable, Inject} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class HighschoolData {
  public fireSchool: any;
  public rootRef: any;
  public currentUser: any;

  constructor() {
    this.fireSchool = firebase.database().ref('/highSchools');
    this.rootRef = firebase.database().ref('/');
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

    updates['/highSchools/' + state + '/' + schoolId + '/students/' + this.currentUser.uid] = true;
    updates['/userProfile/' + this.currentUser.uid + '/highSchool/city'] = city;
    updates['/userProfile/' + this.currentUser.uid + '/highSchool/name'] = schoolName;
    updates['/userProfile/' + this.currentUser.uid + '/highSchool/state'] = state;
    updates['/userProfile/' + this.currentUser.uid + '/highSchool/id'] = schoolId;

    return this.rootRef.update(updates);

  }

}
