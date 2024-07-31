import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { IWorkoutTemplate, Workout } from './workout.model';

@Component({
  selector: 'training-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutPage implements OnInit{

  private _cdr = inject(ChangeDetectorRef);

  public list: Workout[] = [];
  constructor() {}

  public ngOnInit(): void {
    this.list = [
      new Workout({
        id: 1,
        title: 'Тренировка #1',
        subtitle: 'Подзаголовок(дата и т.д.)',
        beginDate: new Date('2024.07.31'),
        endDate: undefined,
        active: true
      }),
      new Workout({
        id: 2,
        title: 'Тренировка #2',
        subtitle: 'Подзаголовок(дата и т.д.)',
        beginDate: new Date('2024.07.31'),
        endDate: undefined,
        active: false
      }),
      new Workout({
        id: 3,
        title: 'Тренировка #3',
        subtitle: 'Подзаголовок(дата и т.д.)',
        beginDate: new Date('2024.07.31'),
        endDate: undefined,
        active: false
      }),
      new Workout({
        id: 4,
        title: 'Тренировка #4',
        subtitle: 'Подзаголовок(дата и т.д.)',
        beginDate: new Date('2024.07.31'),
        endDate: undefined,
        active: false
      }),
    ];
    this._cdr.detectChanges();
  }

  public get activeWorkout(): Workout | undefined {
    console.log(this.list.find(workout => workout.active));
    return this.list.find(workout => workout.active);
  }
}
