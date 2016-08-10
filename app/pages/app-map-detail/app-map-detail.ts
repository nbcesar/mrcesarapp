import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppMapData } from '../../providers/app-map-data/app-map-data';

@Component({
  templateUrl: 'build/pages/app-map-detail/app-map-detail.html',
  providers: [AppMapData]
})
export class AppMapDetailPage {
  public todo: any;
  public steps: any[];
  public progress: number;
  public completedSteps: any[];
  constructor(private nav: NavController, public navParams: NavParams,
    public appMapData: AppMapData) {

    this.navParams = navParams;
    this.appMapData = appMapData;
    this.todo = this.navParams.get('todo');

    this.steps = this.todo.steps.map( (step, i) => ({
      id: i,
      name: step.name,
      completed: step.completed
    }));
    this.completedSteps = this.steps.filter(step => step.completed == true);

    this.calculateProgress();

  }

  calculateProgress(){
    this.progress = (this.completedSteps.length / this.steps.length) * 100;
  }

  completeStep(todoCategory, todoId, stepId, step){
    step.completed = true;
    this.completedSteps.length += 1;
    this.calculateProgress();
    this.appMapData.markStepCompleted(todoCategory, todoId, stepId, this.progress);
  }

  clearCompleteStep(todoCategory, todoId, stepId, step){
    step.completed = false;
    this.completedSteps.length -= 1;
    this.calculateProgress();
    this.appMapData.clearStepCompleted(todoCategory, todoId, stepId, this.progress);
  }

}
