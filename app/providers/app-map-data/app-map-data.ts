import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AppMapData {
  public currentUser: any;
  public userProfile: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getGeneral(): any {
    return this.userProfile.child(this.currentUser.uid).child('appMap').child('prepare');
  }

  getApply(): any {
    return this.userProfile.child(this.currentUser.uid).child('appMap').child('apply');
  }

  getFinAid(): any {
    return this.userProfile.child(this.currentUser.uid).child('appMap').child('aid');
  }

  markStepCompleted(todoType, todoId, stepId, progress): any {
    let updates = {};
    let completedTodo;
    if (progress == 100){
      completedTodo = true;
    } else {
      completedTodo = false;
    }

    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/progress'] = progress;
    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/completed'] = completedTodo;
    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/' + '/steps/' + stepId + '/completed'] = true;
    return this.userProfile.update(updates);
  }

  clearStepCompleted(todoType, todoId, stepId, progress): any {
    let updates = {};
    let completedTodo;

    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/progress'] = progress;
    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/completed'] = false;
    updates['/' + this.currentUser.uid + '/appMap/' + todoType + '/' + todoId
      + '/' + '/steps/' + stepId + '/completed'] = false;
    return this.userProfile.update(updates);
  }

}
