import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'training-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {
  public form!: FormGroup;
  constructor() {}

  public ngOnInit(): void {
    this.form = this._initForm();
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
  }
}
