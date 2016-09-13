import { Component } from '@angular/core';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { AppMapDetailPage } from '../app-map-detail/app-map-detail';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { AppMapData } from '../../providers/app-map-data/app-map-data';

@Component({
  templateUrl: 'build/pages/app-map/app-map.html',
  providers: [AppMapData]
})
export class AppMapPage {
  todoCategory: string = 'general';
  isAndroid: boolean = false;
  isWindows: boolean = false;
  generalList: any = [];
  applyList: any = [];
  aidList: any = [];
  showAppMap: boolean = false;
  loading: any;

  constructor(public nav: NavController, platform: Platform,
    public appMapData: AppMapData, public loadingCtrl: LoadingController) {

    this.nav = nav;
    this.isAndroid = platform.is('android');
    this.isWindows = platform.is('windows');

    this.appMapData.getGeneral().on('value', todoList => {
      this.generalList = [];
      todoList.forEach( todo => {
        this.generalList.push({
          id: todo.key,
          title: todo.val().title,
          description: todo.val().description,
          category: todo.val().category,
          steps: todo.val().steps,
          completed: todo.val().completed,
          progress: todo.val().progress
        });
      });
    });

    this.appMapData.getApply().on('value', todoList => {
      if (todoList.val().showList) this.showAppMap = true;
      this.applyList = [];
      todoList.forEach( todo => {
        this.applyList.push({
          id: todo.key,
          title: todo.val().title,
          description: todo.val().description,
          category: todo.val().category,
          steps: todo.val().steps,
          completed: todo.val().completed,
          progress: todo.val().progress
        });
      });
    });

    this.appMapData.getFinAid().on('value', todoList => {
      if (todoList.val().showList) this.showAppMap = true;
      this.aidList = [];
      todoList.forEach( todo => {
        this.aidList.push({
          id: todo.key,
          title: todo.val().title,
          description: todo.val().description,
          category: todo.val().category,
          completed: todo.val().completed,
          steps: todo.val().steps,
          progress: todo.val().progress
        });
      });
    });
  }

  goToSearch(){
    this.nav.push(SearchPage);
  }

  goToProfile(){
    this.nav.push(ProfilePage);
  }

  goToDetail(todo){
    this.nav.push(AppMapDetailPage, {
      todo: todo
    });
  }
}
