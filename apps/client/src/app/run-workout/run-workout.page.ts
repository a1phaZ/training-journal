import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable, tap } from 'rxjs';
import { FeedWorkoutById } from '../workout/workout.actions';
import { Workout } from '../workout/workout.model';

@Component({
  selector: 'training-run-workout',
  templateUrl: './run-workout.page.html',
  styleUrls: ['./run-workout.page.scss']
})
export class RunWorkoutPage implements OnInit {

  public id!: number;

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);

  public workout$: Observable<Workout | undefined> = this._store
    .select((state: { workouts: Workout[] }) =>
      state.workouts.find(
        (workout: Workout) => workout.id === this.id
      )
    );

  constructor() {
  }

  public ngOnInit(): void {
    this._route.params.pipe(
      map((params) => +params['id']),
      tap((id) => {
        this.id = id;
        this._store.dispatch(new FeedWorkoutById(id));
      })
    ).subscribe();

  }
}
