import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunWorkoutPageRoutingModule } from './run-workout-routing.module';

import { RunWorkoutPage } from './run-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunWorkoutPageRoutingModule,
  ],
  declarations: [RunWorkoutPage],
})
export class RunWorkoutPageModule {}
