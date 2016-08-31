import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {CollegeData} from '../../providers/college-data/college-data';

@Component({
  templateUrl: 'build/pages/college/college.html',
  providers: [CollegeData]
})
export class CollegePage {
  college: any;
  collegeId: string;
  admissibility: string;
  favoriteCollege: boolean;
  canUpdate: boolean;

  constructor(public nav: NavController, public navParams: NavParams,
    public collegeData: CollegeData, public alertCtrl: AlertController) {
    this.collegeId = this.navParams.get('collegeId');
    this.admissibility = this.navParams.get('admissibility');
    this.favoriteCollege = this.navParams.get('favoriteCollege');
    this.canUpdate = this.navParams.get('canUpdate');

    this.collegeData.getCollegeDetail(this.navParams.get('collegeId')).on('value', collegeDetail => {
      console.log('looking for details...');
      this.college = collegeDetail.val();
      console.log(this.college);
    });

  }

  toggleFavorite(event){
    if (event.checked == true){
      this.addCollegeAsFavorite();
    } else {
      this.removeCollegeAsFavorite();
    }
  }

  removeCollegeAsFavorite() {
    this.collegeData.removeCollegeFavorite(this.collegeId);
  }

  addCollegeAsFavorite() {
    // If admissibility has not been calculated, alert user to complete profile
    if (this.canUpdate == false) {
      let alert = this.alertCtrl.create({
        title: 'Profile is incomplete',
        subTitle: 'Hey - complete your profile before adding schools.',
        buttons: ['Ok']
      });
      alert.present();
      this.favoriteCollege = false;
    }
    else {
      this.collegeData.addCollegeFavorite(this.collegeId);
    }
  }

}
