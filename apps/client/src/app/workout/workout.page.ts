import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Workout } from './workout.model';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { FeedWorkouts } from './workout.actions';
import { WorkoutState } from './workout.state';
import { Router } from '@angular/router';

@Component({
  selector: 'training-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutPage implements OnInit, OnDestroy {

  private _cdr = inject(ChangeDetectorRef);
  private _store = inject(Store);
  public list$: Observable<Workout[]> = this._store.select(WorkoutState.workoutsList);
  public activeWorkout$: Observable<Workout | undefined> = this._store.select(WorkoutState.activeWorkout);
  private _destroy$ = new Subject<void>();
  private _router = inject(Router);
  // public firstWorkout$: Observable<Workout | undefined> = this._store.select(WorkoutState.workoutById).pipe(
  //   map(fn => fn(1))
  // );

  public ngOnInit(): void {
    this._store.dispatch(new FeedWorkouts());
    this._cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onWorkoutClick(id: number) {
    this._router.navigate(['workout', 'run', id]);
  }

  createWorkout() {
    this._router.navigate(['workout', 'create']);
    this._cdr.detectChanges();
  }
}
