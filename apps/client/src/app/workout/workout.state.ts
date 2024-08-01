import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { Workout } from './workout.model';
import {
  FeedWorkoutById,
  FeedWorkoutByIdFailure, FeedWorkoutByIdSuccess,
  FeedWorkouts,
  FeedWorkoutsFailure,
  FeedWorkoutsSuccess
} from './workout.actions';
import { WorkoutService } from './workout.service';
import { catchError, tap } from 'rxjs';

export const WORKOUTS_STATE_TOKEN = new StateToken<Workout[]>('workouts');

@State({
  name: WORKOUTS_STATE_TOKEN,
  defaults: [],
})
@Injectable()
export class WorkoutState {

  private _workoutService = inject(WorkoutService);

  @Action(FeedWorkouts)
  feedWorkouts(ctx: StateContext<Workout[]>) {
    return this._workoutService.feedWorkouts().pipe(
      tap((data) => ctx.dispatch(new FeedWorkoutsSuccess(data))),
      catchError((error) => ctx.dispatch(new FeedWorkoutsFailure(error)))
    )
  }

  @Action(FeedWorkoutsSuccess)
  feedWorkoutsSuccess(ctx: StateContext<Workout[]>, { payload }: FeedWorkoutsSuccess) {
    return ctx.setState(payload);
  }

  @Action(FeedWorkoutsFailure)
  feedWorkoutsFailure(ctx: StateContext<Workout[]>, { error }: FeedWorkoutsFailure) {
    console.log(error);
    return ctx.setState([]);
  }

  @Action(FeedWorkoutById)
  feedWorkoutById(ctx: StateContext<Workout[]>, { payload: id }: FeedWorkoutById) {
    const workout = WorkoutState.workoutById(ctx.getState())(id);
    console.log(workout);
    if (workout) {
      return;
    }
    return this._workoutService.feedWorkoutById(id).pipe(
      tap((data) => ctx.dispatch(new FeedWorkoutByIdSuccess(data))),
      catchError((error) => ctx.dispatch(new FeedWorkoutByIdFailure(error)))
    )
  }

  @Action(FeedWorkoutByIdSuccess)
  feedWorkoutByIdSuccess(ctx: StateContext<Workout[]>, { payload }: FeedWorkoutByIdSuccess) {
    const state = ctx.getState();
    const index = state.findIndex(workout => workout.id === payload.id);

    if (index !== -1) {
      state[index] = payload;
    } else {
      state.push(payload);
    }
    console.log(state, index, payload);
    return ctx.setState(state);
  }

  @Action(FeedWorkoutByIdFailure)
  feedWorkoutByIdFailure(_: StateContext<Workout[]>, { error }: FeedWorkoutByIdFailure) {
    console.log(error);
    return;
  }

  @Selector()
  static workoutsList(state: Workout[]) {
    return state || [];
  }

  @Selector()
  static activeWorkout(state: Workout[]) {
    return state.find(workout => workout.active);
  }

  @Selector()
  static workoutById(state: Workout[]) {
    console.log('workoutById', state);
    return (id: number) => state.find(workout => workout.id === id);
  }
}
