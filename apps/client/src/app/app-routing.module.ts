import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'create-workout',
    loadChildren: () =>
      import('./workout/create-workout/create-workout.module').then(
        (m) => m.CreateWorkoutPageModule
      ),
  },
  {
    path: 'workout',

    loadChildren: () =>
      import('./workout/workout.module').then((m) => m.WorkoutPageModule),
  },
  {
    path: 'workout/run/:id',
    loadChildren: () =>
      import('./workout/run-workout/run-workout.module').then(
        (m) => m.RunWorkoutPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'workout',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
