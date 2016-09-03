import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';

/*
  Generated class for the AppMapPlaceholderPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/app-map-placeholder/app-map-placeholder.html',
})
export class AppMapPlaceholderPage {

  constructor(private navCtrl: NavController) {

  }

  goToSearch(){
    this.navCtrl.push(SearchPage);
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

}
