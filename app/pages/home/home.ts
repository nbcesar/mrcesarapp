import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { CollegeData } from '../../providers/college-data/college-data';
import { AppMapData } from '../../providers/app-map-data/app-map-data';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ProfileData, CollegeData, AppMapData]
})
export class HomePage {
  userProfile: any;
  profileProgress: number = 0;
  listProgress: number = 0;
  moonshotCollegeNumber: number;
  reachCollegeNumber: number;
  targetCollegeNumber: number;
  safetyCollegeNumber: number;
  cunyCollegeNumber: number;
  sunyCollegeNumber: number;
  generalSteps: number;
  generalCompletedSteps: number;
  applySteps: number;
  applyCompletedSteps: number;
  aidSteps: number;
  aidCompletedSteps: number;


   constructor(public nav: NavController, public profileData: ProfileData,
    public collegeData: CollegeData, public appMapData: AppMapData) {


  }

  ionViewDidEnter(){
    this.listProgress = 0;

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.profileProgress = 0;

      if (this.userProfile.firstName) {this.profileProgress += 8;}
      if (this.userProfile.email) {this.profileProgress += 8;}
      if (this.userProfile.birthDate) {this.profileProgress += 8;}
      if (this.userProfile.highSchool) {this.profileProgress += 8;}
      if (this.userProfile.gpaScale) {this.profileProgress += 8;}
      if (this.userProfile.gpaScore) {this.profileProgress += 8;}
      if (this.userProfile.testType) {this.profileProgress += 8;}

      if (this.userProfile.testType == 'act' && this.userProfile.actCompositeScore) {
        this.profileProgress += 8;
      }
      if (this.userProfile.testType == 'sat' && this.userProfile.satMath) {
        this.profileProgress += 4;
      }
      if (this.userProfile.testType == 'sat' && this.userProfile.satVerbal) {
        this.profileProgress += 4;
      }

      if (this.userProfile.race) {this.profileProgress += 8;}

      if (this.userProfile.counselorEmail) {this.profileProgress += 8;}
      if (this.userProfile.counselorName) {this.profileProgress += 8;}
      if (this.userProfile.gender) {this.profileProgress += 4;}
      if (this.userProfile.graduationDate) {this.profileProgress += 8;}


    }, (error) => {
      console.log(error);
    });

    this.collegeData.getMoonshotList().once('value').then((collegeList) => {
      let moonshotColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          moonshotColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.moonshotCollegeNumber = moonshotColleges.length;
      if (this.moonshotCollegeNumber >= 1 && this.userProfile.state == 'NY') {
        this.listProgress += 15;
      } else if (this.moonshotCollegeNumber >= 1 && this.userProfile.state !== 'NY') {
        this.listProgress += 25;
      }
    });

    this.collegeData.getReachList().once('value').then((collegeList) => {
      let reachColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          reachColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.reachCollegeNumber = reachColleges.length;
      if (this.userProfile.state == 'NY') {
        if (this.reachCollegeNumber == 1) {
          this.listProgress += 5;
        } else if (this.reachCollegeNumber == 2) {
          this.listProgress += 10;
        } else if (this.reachCollegeNumber >= 1) {
          this.listProgress += 15;
        }
      } else {
        if (this.reachCollegeNumber == 1) {
          this.listProgress += 8;
        } else if (this.reachCollegeNumber == 2) {
          this.listProgress += 16;
        } else if (this.reachCollegeNumber >= 1) {
          this.listProgress += 25;
        }
      }
    });

    this.collegeData.getTargetList().once('value').then((collegeList) => {
      let targetColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          targetColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.targetCollegeNumber = targetColleges.length;
      if (this.userProfile.state == 'NY'){
        if (this.targetCollegeNumber == 1) {
          this.listProgress += 5;
        } else if (this.targetCollegeNumber == 2) {
          this.listProgress += 10;
        } else if (this.targetCollegeNumber >= 1) {
          this.listProgress += 15;
        }
      } else {
        if (this.targetCollegeNumber == 1) {
          this.listProgress += 8;
          console.log(this.targetCollegeNumber);
        } else if (this.targetCollegeNumber == 2) {
          this.listProgress += 16;
        } else if (this.targetCollegeNumber >= 1) {
          this.listProgress += 25;
        }

      }
    });

    this.collegeData.getSafetyList().once('value').then((collegeList) => {
      let safetyColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          safetyColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.safetyCollegeNumber = safetyColleges.length;
      if (this.userProfile.state == 'NY') {
        if (this.safetyCollegeNumber == 1) {
          this.listProgress += 8;
        } else if (this.safetyCollegeNumber >= 2) {
          this.listProgress += 15;
        }
      } else {
        if (this.safetyCollegeNumber == 1) {
          this.listProgress += 12;
        } else if (this.safetyCollegeNumber >= 2) {
          this.listProgress += 25;
        }
      }
    });

    this.collegeData.getCunyList().once('value').then((collegeList) => {
      let cunyColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          cunyColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.cunyCollegeNumber = cunyColleges.length;
      if (this.userProfile.state == 'NY') {
        if (this.cunyCollegeNumber == 1) {
          this.listProgress += 3;
        } else if (this.cunyCollegeNumber == 2) {
          this.listProgress += 6;
        } else if (this.cunyCollegeNumber == 3) {
          this.listProgress += 9;
        } else if (this.cunyCollegeNumber == 4) {
          this.listProgress += 12;
        } else if (this.cunyCollegeNumber == 5) {
          this.listProgress += 15;
        } else if (this.cunyCollegeNumber >= 6) {
          this.listProgress += 20;
        }
      }
    });

    this.collegeData.getSunyList().once('value').then((collegeList) => {
      let sunyColleges = [];
      collegeList.forEach( college => {
        if (college.val().hasOwnProperty('favorite')) {
          sunyColleges.push({
            id: college.key,
            name: college.val().name,
          });
        }
      });
      this.sunyCollegeNumber = sunyColleges.length;
      if (this.userProfile.state == 'NY') {
        if (this.sunyCollegeNumber == 1) {
          this.listProgress += 5;
        } else if (this.sunyCollegeNumber == 2) {
          this.listProgress += 10;
        } else if (this.sunyCollegeNumber == 3) {
          this.listProgress += 15;
        } else if (this.sunyCollegeNumber >= 4) {
          this.listProgress += 20;
        }
      }
    });

    this.appMapData.getGeneral().on('value', todoList => {
      let general: number = 0;
      let generalCompleted: number = 0;
      todoList.forEach( todo => {
        general += 1;
        if (todo.val().completed == true){
          generalCompleted += 1;
        }
      });
      this.generalSteps = general;
      this.generalCompletedSteps = generalCompleted;
    });

    this.appMapData.getApply().on('value', todoList => {
      let apply = 0;
      let applyCompleted = 0;
      todoList.forEach( todo => {
        apply += 1;
        if (todo.val().completed == true){
          applyCompleted += 1;
        }
      });
      this.applySteps = apply;
      this.applyCompletedSteps = applyCompleted;
    });

    this.appMapData.getFinAid().on('value', todoList => {
      let aid = 0;
      let aidCompleted = 0;
      todoList.forEach( todo => {
        aid += 1;
        if (todo.val().completed == true){
          aidCompleted += 1;
        }
      });
      this.aidSteps = aid;
      this.aidCompletedSteps = aidCompleted;
    });

  }

  goToSearch(){
    this.nav.push(SearchPage);
  }

  goToProfile(){
    this.nav.push(ProfilePage);
  }

  goToFilteredSearch(admissibility){
    this.nav.push(SearchPage, {
      admissibility: admissibility,
      showList: true
    });
  }

}
