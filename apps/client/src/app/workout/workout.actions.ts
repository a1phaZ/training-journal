import { Workout } from './workout.model';

export enum WorkoutActions {
  FEED_WORKOUTS = '[WORKOUTS] Feed Workouts',
  FEED_WORKOUTS_SUCCESS = '[WORKOUTS] Feed Workouts Success',
  FEED_WORKOUTS_FAILURE = '[WORKOUTS] Feed Workouts Failure',
  FEED_WORKOUT_BY_ID = '[WORKOUTS] Feed Workout By Id',
  FEED_WORKOUT_BY_ID_SUCCESS = '[WORKOUTS] Feed Workout By Id Success',
  FEED_WORKOUT_BY_ID_FAILURE = '[WORKOUTS] Feed Workout By Id Failure',
  SET_ACTIVE_WORKOUT = '[WORKOUTS] Set Active Workout',
  SET_ACTIVE_WORKOUT_SUCCESS = '[WORKOUTS] Set Active Workout Success',
  SET_ACTIVE_WORKOUT_FAILURE = '[WORKOUTS] Set Active Workout Failure',
}

export class FeedWorkouts {
  static readonly type = WorkoutActions.FEED_WORKOUTS;
}

export class FeedWorkoutsSuccess {
  static readonly type = WorkoutActions.FEED_WORKOUTS_SUCCESS;
  constructor(public payload: Workout[]) {
  }
}

export class FeedWorkoutsFailure {
  static readonly type = WorkoutActions.FEED_WORKOUTS_FAILURE;
  constructor(public error: Error) {
  }
}

export class FeedWorkoutById {
  static readonly type = WorkoutActions.FEED_WORKOUT_BY_ID;
  constructor(public payload: number) {
  }
}

export class FeedWorkoutByIdSuccess {
  static readonly type = WorkoutActions.FEED_WORKOUT_BY_ID_SUCCESS;
  constructor(public payload: Workout) {
  }
}

export class FeedWorkoutByIdFailure {
  static readonly type = WorkoutActions.FEED_WORKOUT_BY_ID_FAILURE;
  constructor(public error: Error) {
  }
}
