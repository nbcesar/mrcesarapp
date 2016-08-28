import {Injectable} from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class ProfileData {
  public userProfile: any;
  public currentUser: any;
  storageRef: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

    this.storageRef = firebase.storage().ref();

  }

  createProfile(gpaScale: string, gpaScore: number,
    testType: string, actCompositeScore: number, satVerbal: number, satMath: number): any {
    return this.userProfile.child(this.currentUser.uid).update({
      id: this.currentUser.uid,
      gpaScale: gpaScale,
      gpaScore: gpaScore,
      testType: testType,
      actCompositeScore: actCompositeScore,
      satVerbal: satVerbal,
      satMath: satMath,
    });
  }

  getProfile(userId): any {
    return this.userProfile.child(userId);
  }

  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): any {
    if (!firstName) { firstName = null }
    if (!lastName) { lastName = null }

    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateCounselorName(counselorName: string): any {
    if (!counselorName) { counselorName = null }

    return this.userProfile.child(this.currentUser.uid).update({
      counselorName: counselorName,
    });
  }

  updateCounselorEmail(counselorEmail: string): any {
    if (!counselorEmail) { counselorEmail = null }

    return this.userProfile.child(this.currentUser.uid).update({
      counselorEmail: counselorEmail,
    });
  }

  updateDOB(birthDate: string): any {
    if (!birthDate) { birthDate = null }

    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateProfileSelfie(imageURL: string = null): any {
    return this.storageRef.child('profileSelfies').child(this.currentUser.uid)
      .child('profilePicture.png').putString(imageURL, 'base64', {contentType: 'image/png'})
        .then( snapshot => {
        this.userProfile.child(this.currentUser.uid).update({
          profileSelfie: snapshot.downloadURL,
        });
      });
  }

  updateGraduationDate(graduationDate: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      graduationDate: graduationDate,
    });
  }

  updateSchool(schoolName: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      highSchool: schoolName,
    });
  }

  updateSchoolState(highSchoolState: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      highSchoolState: highSchoolState,
    });
  }

  updateGPAScale(gpaScale: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      gpaScale: gpaScale,
      gpaScore: null,
      updateProfile: true
    });
  }

  updateGender(gender: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      gender: gender,
    });
  }

  updateGPAScore(gpaScore: string = null): any {
    this.userProfile.child(this.currentUser.uid).update({
      gpaScore: gpaScore
    });
    return this.updateMatchProfile();
  }

  updateACTScore(actScore: string = null): any {
    this.userProfile.child(this.currentUser.uid).update({
      actCompositeScore: actScore,
      satVerbal: null,
      satMath: null,
      updateProfile: true
    });
    return this.updateMatchProfile();
  }

  updateSATScore(satVerbal: string = null, satMath: string = null): any {
    this.userProfile.child(this.currentUser.uid).update({
      actCompositeScore: null,
      satVerbal: satVerbal,
      satMath: satMath,
      updateProfile: true
    });
    return this.updateMatchProfile();
  }

  updateTestType(testType: string = null): any {
    return this.userProfile.child(this.currentUser.uid).update({
      testType: testType,
      satVerbal: null,
      satMath: null,
      actCompositeScore: null,
      updateProfile: true
    });
  }

  updateEmail(newEmail: string, userPassword: string): any {
    var credential = ( <any> firebase.auth.EmailAuthProvider).credential(this.currentUser.email, userPassword);
    this.currentUser.reauthenticate(credential).then(() => {
       this.currentUser.updateEmail(newEmail).then(() => {
        this.userProfile.child(this.currentUser.uid).update({
          email: newEmail
        });
      }, (error) => {
        console.log(error);
      });
    });
  }

  // updateEmail(newEmail: string, userPassword: string): any {
  //   this.currentUser.updateEmail(newEmail).then(() => {
  //     this.userProfile.child(this.currentUser.uid).update({
  //       email: newEmail
  //     });
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  updatePassword(newPassword: string, oldPassword: string): any {
    var credential = ( <any> firebase.auth.EmailAuthProvider).credential(this.currentUser.email, oldPassword);
    this.currentUser.reauthenticate(credential).then(() => {
      this.currentUser.updatePassword(newPassword).then(() => {
        console.log("Password Changed");
      }, (error) => {
        console.log(error);
      });
    });
  }

  // updatePassword(newPassword: string, oldPassword: string): any {
  //   this.currentUser.updatePassword(newPassword).then(() => {
  //     console.log("Password Changed");
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  updateRace(race: string = null): any {
    this.userProfile.child(this.currentUser.uid).update({
      race: race,
      updateProfile: true
    });
    return this.updateMatchProfile();
  }

  updateMatchProfile(): any {
    return this.userProfile.child(this.currentUser.uid).child('updateProfile').set('true');
  }

}
