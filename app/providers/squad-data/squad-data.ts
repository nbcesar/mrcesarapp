import {Injectable} from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class SquadData {
  public squadList: any;
  public currentUser: any;
  public userProfile: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.squadList = firebase.database().ref('/squadList');
    this.userProfile = firebase.database().ref('/userProfile');

  }

  createSquad(squadName: string): any {
    return this.squadList.push({
      squadName: squadName,
      squadAdmin: this.currentUser.uid,
    }).then((squad) => {
      this.squadList.child(squad.key).child('members').child(this.currentUser.uid).update({
        isMember: true,
      });
      this.userProfile.child(this.currentUser.uid).update({
        squad: squad.key,
      });
    }, (error) => {
      console.log(error);
    });
  }

  sendMessage(message: string, squad: string, firstName: string): any {
    return this.squadList.child(squad).child('messages').push({
      message: message,
      sender: this.currentUser.uid,
      senderName: firstName,
    });
  }

  getMessages(squad: string): any {
    return this.squadList.child(squad).child('messages');
  }

}
