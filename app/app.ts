import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    var config = {
      apiKey: "AIzaSyAiquWTntv-tFERuUPdpVhfDUrVNliHFDQ",
      authDomain: "mrcesarapp.firebaseapp.com",
      databaseURL: "https://mrcesarapp.firebaseio.com",
      storageBucket: "mrcesarapp.appspot.com",
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [], {});
