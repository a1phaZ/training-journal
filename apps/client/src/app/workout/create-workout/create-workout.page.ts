import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'training-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit, OnDestroy {
  // TODO Переделать форму в класс
  public form!: FormGroup;
  public formIsDraft = false;

  private _destroy$ = new Subject<void>();
  constructor() {}

  public ngOnInit(): void {
    this.form = this._initForm();
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => (this.formIsDraft = true));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      attempts: new FormArray([this._initAttempt()]),
    })
  }

  private _initAttempt(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      initialWeight: new FormControl(0, [Validators.required, Validators.min(0)]),
      numberOfApproaches: new FormControl(0, [Validators.required, Validators.min(0)]),
      numberOfReps: new FormControl(0, [Validators.required, Validators.min(0)]),
    })
  }

  public addAttempt(): void {
    (this.form.get('attempts') as FormArray).push(this._initAttempt());
  }

  public get attemptForms(): FormGroup[] {
    return (this.form.get('attempts') as FormArray).controls as FormGroup[];
  }

  submit() {
    console.log(this.form.value);
    this.form.reset();
    this.formIsDraft = false;
  }
}
