import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  createAnonymousUser(gpaScale: string, gpaScore: number, testType: string,
    actCompositeScore: number = null, satVerbal: number = null, satMath: number = null, race: string): any {
    return this.fireAuth.signInAnonymously().then((anonymousUser) => {
      this.userProfile.child(anonymousUser.uid).set({
        id: anonymousUser.uid,
        gpaScale: gpaScale,
        gpaScore: gpaScore,
        testType: testType,
        actCompositeScore: actCompositeScore,
        satVerbal: satVerbal,
        satMath: satMath,
        race: race
      });
    });
  }

  resetPassword(email): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}
