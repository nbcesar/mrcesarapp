import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { SquadData } from '../../providers/squad-data/squad-data';
import { ProfileData } from '../../providers/profile-data/profile-data';

@Component({
  templateUrl: 'build/pages/squad/squad.html',
  providers: [SquadData, ProfileData]
})
export class SquadPage {
  @ViewChild(Content) chatScroll: Content;
  public userProfile: any;
  public hasSquad: boolean;
  public messageList: any;
  public messageToSend: string;
  public squadAction: string = 'progressUpdate';
  isAndroid: boolean = false;

  constructor(public nav: NavController, public squadData: SquadData,
    public profileData: ProfileData, platform: Platform) {
    this.isAndroid = platform.is('android');

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();

      if (this.userProfile.squad) {
        this.squadData.getMessages(this.userProfile.squad).on('value', messageList => {
          let messages = [];
          messageList.forEach( message => {
            messages.push({
              id: message.key,
              message: message.val().message,
              sender: message.val().sender,
              senderName: message.val().senderName,
              timeStamp: message.val().timeStamp,
            });
          });
          this.messageList = messages;
        }, error => {
          console.log(error);
        });
      }

    });

  }

  onSegmentChanged($event) {
    if ($event.value == 'chat'){
      setTimeout(() => {
        this.chatScroll.scrollToBottom(300);
      }, 300);
    }
  }

  goToSearch(){
    this.nav.push(SearchPage);
  }

  goToProfile(){
    this.nav.push(ProfilePage);
  }

  createSquad(squadName){
    this.squadData.createSquad(squadName);
  }

  sendMessage(message, squad, firstName){
    this.squadData.sendMessage(message, squad, firstName).then( message => {
      this.messageToSend = '';
      this.chatScroll.scrollToBottom(100);
    }, error => {
      console.log(error);
    });
  }

}
