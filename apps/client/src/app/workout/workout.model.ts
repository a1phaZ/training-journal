export interface IWorkout {
  // id: number;
  title: string;
  subtitle: string;
  beginDate: Date;
  endDate?: Date;
  active: boolean;
}

export interface IWorkoutDB extends IWorkout {
  id: number;
}

export interface IWorkoutProperty {
  title: string;
  value: string | Date | number | boolean | undefined;
}

export interface IWorkoutTemplate {
  id: number;
  title: string;
  subtitle: string;
  properties: IWorkoutProperty[];
  active: boolean;
}

export class Workout implements IWorkout, IWorkoutDB {
  constructor(data: IWorkout | IWorkoutDB) {
    if ('id' in data) {
      this.id = data.id;
    }
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.beginDate = data.beginDate;
    this.endDate = data.endDate;
    this.active = data.active || false;
  }

  // active: boolean;
  private _id!: number;

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  private _title!: string;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  private _subtitle!: string;

  public get subtitle(): string {
    return this._subtitle;
  }

  public set subtitle(value: string) {
    this._subtitle = value;
  }

  private _beginDate!: Date;

  public get beginDate(): Date {
    return this._beginDate;
  }

  public set beginDate(value: Date) {
    this._beginDate = value;
  }

  private _endDate!: Date | undefined;

  public get endDate(): Date | undefined{
    return this._endDate;
  }

  public set endDate(value: Date | undefined) {
    this._endDate = value;
  }

  private _active!: boolean;

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
  }

  public toJSON(): IWorkout {
    return {
      title: this.title,
      subtitle: this.subtitle,
      beginDate: this.beginDate,
      endDate: this.endDate,
      active: this.active
    };
  }

  public toTemplate(): IWorkoutTemplate {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      properties: this._getProperties(),
      active: this.active
    }
  }

  private _getProperties(): IWorkoutProperty[] {
    return [
      {
        title: 'Кол-во упражнений',
        value: '7'
      },
      {
        title: 'Осталось упражнений',
        value: '5'
      },
      {
        title: 'Дата начала',
        value: this.beginDate
      },
      {
        title: 'Дата окончания',
        value: this.endDate
      }
    ];
  }
}
