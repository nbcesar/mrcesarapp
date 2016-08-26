import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { SquadPlaceholderPage } from '../squad-placeholder/squad-placeholder';
import { AppMapPage } from '../app-map/app-map';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListPage;
  tab3Root: any = AppMapPage;
  tab4Root: any = SquadPlaceholderPage;
  badgeNum: number = 1;
}
