import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { HighschoolSelectPage } from '../highschool-select/highschool-select';
import { LoginPage } from '../login/login';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData, AuthData]
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public graduationDate: string;
  public profileImage: string;
  public mrCesarLogo: string;

  constructor(public nav: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController) {
    this.profileImage = "img/mr-cesar-face.png";
    this.mrCesarLogo = "img/mr-cesar-face.png";

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
      this.graduationDate = this.userProfile.graduationDate;
      if (this.userProfile.profileSelfie) {
        this.profileImage = this.userProfile.profileSelfie;
      }
    });

  }

  takeSelfie(){
    Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.profileData.updateProfileSelfie(imageData);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  updateDOB(birthDate){
    this.profileData.updateDOB(birthDate);
  }

  updateGraduationDate(graduationDate){
    this.profileData.updateGraduationDate(graduationDate);
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  updateName(){
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateCounselorName(){
    let alert = this.alertCtrl.create({
      message: "Your counselor's name",
      inputs: [
        {
          name: 'counselorName',
          placeholder: "Your counselor's name",
          value: this.userProfile.counselorName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateCounselorName(data.counselorName);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your pasword',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updateCounselorEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'counselorEmail',
          placeholder: "Your counselor's email",
          type: "email",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateCounselorEmail(data.counselorEmail);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

  updateSchool(){
    this.nav.push(HighschoolSelectPage);
  }

  updateSchoolState(){
    let alert = this.alertCtrl.create();

    alert.addInput({
      type: 'radio',
      label: "AL",
      value: "AL"
    });

    alert.addInput({
      type: 'radio',
      label: "AK",
      value: "AK"
    });

    alert.addInput({
      type: 'radio',
      label: "AZ",
      value: "AZ"
    });

    alert.addInput({
      type: 'radio',
      label: "AR",
      value: "AR"
    });

    alert.addInput({
      type: 'radio',
      label: "CA",
      value: "CA"
    });

    alert.addInput({
      type: 'radio',
      label: "CO",
      value: "CO"
    });

    alert.addInput({
      type: 'radio',
      label: "CT",
      value: "CT"
    });

    alert.addInput({
      type: 'radio',
      label: "DE",
      value: "DE"
    });

    alert.addInput({
      type: 'radio',
      label: "FL",
      value: "FL"
    });

    alert.addInput({
      type: 'radio',
      label: "GA",
      value: "GA"
    });

    alert.addInput({
      type: 'radio',
      label: "HI",
      value: "HI"
    });

    alert.addInput({
      type: 'radio',
      label: "ID",
      value: "ID"
    });

    alert.addInput({
      type: 'radio',
      label: "IL",
      value: "IL"
    });

    alert.addInput({
      type: 'radio',
      label: "IN",
      value: "IN"
    });

    alert.addInput({
      type: 'radio',
      label: "IA",
      value: "IA"
    });

    alert.addInput({
      type: 'radio',
      label: "KS",
      value: "KS"
    });

    alert.addInput({
      type: 'radio',
      label: "KY",
      value: "KY"
    });

    alert.addInput({
      type: 'radio',
      label: "LA",
      value: "LA"
    });

    alert.addInput({
      type: 'radio',
      label: "ME",
      value: "ME"
    });

    alert.addInput({
      type: 'radio',
      label: "MD",
      value: "MD"
    });

    alert.addInput({
      type: 'radio',
      label: "MA",
      value: "MA"
    });

    alert.addInput({
      type: 'radio',
      label: "MI",
      value: "MI"
    });

    alert.addInput({
      type: 'radio',
      label: "MN",
      value: "MN"
    });

    alert.addInput({
      type: 'radio',
      label: "MS",
      value: "MS"
    });

    alert.addInput({
      type: 'radio',
      label: "MO",
      value: "MO"
    });

    alert.addInput({
      type: 'radio',
      label: "MT",
      value: "MT"
    });

    alert.addInput({
      type: 'radio',
      label: "NE",
      value: "NE"
    });

    alert.addInput({
      type: 'radio',
      label: "NV",
      value: "NV"
    });

    alert.addInput({
      type: 'radio',
      label: "NH",
      value: "NH"
    });

    alert.addInput({
      type: 'radio',
      label: "NJ",
      value: "NJ"
    });

    alert.addInput({
      type: 'radio',
      label: "NM",
      value: "NM"
    });

    alert.addInput({
      type: 'radio',
      label: "NY",
      value: "NY"
    });

    alert.addInput({
      type: 'radio',
      label: "NC",
      value: "NC"
    });

    alert.addInput({
      type: 'radio',
      label: "ND",
      value: "ND"
    });

    alert.addInput({
      type: 'radio',
      label: "OH",
      value: "OH"
    });

    alert.addInput({
      type: 'radio',
      label: "OK",
      value: "OK"
    });

    alert.addInput({
      type: 'radio',
      label: "OR",
      value: "OR"
    });

    alert.addInput({
      type: 'radio',
      label: "PA",
      value: "PA"
    });

    alert.addInput({
      type: 'radio',
      label: "RI",
      value: "RI"
    });

    alert.addInput({
      type: 'radio',
      label: "SC",
      value: "SC"
    });

    alert.addInput({
      type: 'radio',
      label: "SD",
      value: "SD"
    });

    alert.addInput({
      type: 'radio',
      label: "TN",
      value: "TN"
    });

    alert.addInput({
      type: 'radio',
      label: "TX",
      value: "TX"
    });

    alert.addInput({
      type: 'radio',
      label: "UT",
      value: "UT"
    });

    alert.addInput({
      type: 'radio',
      label: "VT",
      value: "VT"
    });

    alert.addInput({
      type: 'radio',
      label: "VA",
      value: "VA"
    });

    alert.addInput({
      type: 'radio',
      label: "WA",
      value: "WA"
    });

    alert.addInput({
      type: 'radio',
      label: "WV",
      value: "WV"
    });

    alert.addInput({
      type: 'radio',
      label: "WI",
      value: "WI"
    });

    alert.addInput({
      type: 'radio',
      label: "WY",
      value: "WY"
    });

    alert.addInput({
      type: 'radio',
      label: "International",
      value: "international"
    });

    alert.addButton('Cancel');
    alert.addButton({
     text: 'Save',
     handler: data => {
      this.profileData.updateSchoolState(data)
     }
    });

    alert.present();
  }

  updateGPAScale(){
    let alert = this.alertCtrl.create();

    alert.addInput({
      type: 'radio',
      label: '100',
      value: '100',
    });

    alert.addInput({
      type: 'radio',
      label: '4.0',
      value: '4',
    });

    alert.addButton('Cancel');
    alert.addButton({
     text: 'Save',
     handler: data => {
      this.profileData.updateGPAScale(data)
     }
    });



    alert.present();
  }

  updateGender(){
    let alert = this.alertCtrl.create();

    alert.addInput({
      type: 'radio',
      label: 'Female',
      value: 'female',
    });

    alert.addInput({
      type: 'radio',
      label: 'Male',
      value: 'male',
    });

    alert.addButton('Cancel');
    alert.addButton({
     text: 'Save',
     handler: data => {
      this.profileData.updateGender(data)
     }
    });



    alert.present();
  }

  updateGPAScore(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'gpaScore',
          placeholder: 'Your GPA score',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateGPAScore(data.gpaScore);
          }
        }
      ]
    });
    alert.present();
  }

  updateACTScore(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'actScore',
          placeholder: 'Your ACT Composite score',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateACTScore(data.actScore);
          }
        }
      ]
    });
    alert.present();
  }

  updateSATScore(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'satVerbal',
          placeholder: 'Your SAT Verbal score',
        },
        {
          name: 'satMath',
          placeholder: 'Your SAT Math score',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateSATScore(data.satVerbal, data.satMath);
          }
        }
      ]
    });
    alert.present();
  }

  updateTestType(){
    let alert = this.alertCtrl.create();

    alert.addInput({
      type: 'radio',
      label: 'ACT',
      value: 'act',
    });

    alert.addInput({
      type: 'radio',
      label: 'SAT',
      value: 'sat',
    });

    alert.addButton('Cancel');
    alert.addButton({
     text: 'Save',
     handler: data => {
      this.profileData.updateTestType(data);
     }
    });



    alert.present();
  }

  updateRace(){
    let alert = this.alertCtrl.create();

    alert.addInput({
      type: 'radio',
      label: 'Hispanic/Latino',
      value: 'latino',
    });

    alert.addInput({
      type: 'radio',
      label: 'Black/African American',
      value: 'black',
    });

    alert.addInput({
      type: 'radio',
      label: 'Asian/Pacific Islander',
      value: 'asian',
    });

    alert.addInput({
      type: 'radio',
      label: 'Native American/First Nations',
      value: 'nativeAmerican',
    });


    alert.addButton('Cancel');
    alert.addButton({
     text: 'Save',
     handler: data => {
      this.profileData.updateRace(data);
     }
    });



    alert.present();
  }



}
