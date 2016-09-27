import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { SquadPage } from '../squad/squad';
import { AppMapPlaceholderPage } from '../app-map-placeholder/app-map-placeholder';
import { AppMapPage } from '../app-map/app-map';

import { ProfileData } from '../../providers/profile-data/profile-data';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  providers: [ProfileData]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListPage;
  tab3Root: any = AppMapPage;
  tab4Root: any = SquadPage;

  constructor(private profileData: ProfileData) {
    /*this.profileData.getUserProfile().on('value', profile => {
      if (profile.val().showAppMap){
        this.tab3Root = AppMapPage;
      } else {
        this.tab3Root = AppMapPlaceholderPage;
      }
    });*/
  }
}
