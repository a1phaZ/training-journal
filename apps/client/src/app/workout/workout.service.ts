import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() { }

  feedWorkouts() {
    return of([
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
    ])
  }

  feedWorkoutById(id: number) {
    return of(new Workout({
      id,
      title: 'Тренировка #1',
      subtitle: 'Подзаголовок(дата и т.д.)',
      beginDate: new Date('2024.07.31'),
      endDate: undefined,
      active: true
    }))
  }
}
