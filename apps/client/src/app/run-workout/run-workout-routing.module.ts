import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunWorkoutPage } from './run-workout.page';

const routes: Routes = [
  {
    path: '',
    component: RunWorkoutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunWorkoutPageRoutingModule {}
