import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LandingPage} from './pages/landing/landing';
import {AnonymousSearchPage} from './pages/anonymous-search/anonymous-search';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    var config = {
      apiKey: "AIzaSyAiquWTntv-tFERuUPdpVhfDUrVNliHFDQ",
      authDomain: "mrcesarapp.firebaseapp.com",
      databaseURL: "https://mrcesarapp.firebaseio.com",
      storageBucket: "mrcesarapp.appspot.com",
    };

    firebase.initializeApp(config);

    var unsubscribe = firebase.auth().onAuthStateChanged( (user) => {
      if (!user) {
        console.log("No currentUser");
        this.rootPage = LandingPage;
        unsubscribe();
      } else if (user.isAnonymous == true) {
        console.log("Anonymous User");
        unsubscribe();
        //this.rootPage = AnonymousSearchPage;
        this.rootPage = TabsPage;
      } else if (user.isAnonymous == false) {
        console.log("Confirmed User");
        unsubscribe();
        this.rootPage = TabsPage;
      }
    });




    platform.ready().then(() => {

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [], {
  prodMode: true
});
