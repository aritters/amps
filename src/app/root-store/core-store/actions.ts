import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOADING_START = '[Core] Loading Start',
  LOADING_STOP = '[Core] Loading Stop',
  ERROR = '[Core] Error',
}

export class LoadingStartAction implements Action {
  readonly type = ActionTypes.LOADING_START;
  constructor() { }
}

export class LoadingStopAction implements Action {
  readonly type = ActionTypes.LOADING_STOP;
  constructor() { }
}

export class ErrorAction implements Action {
  readonly type = ActionTypes.ERROR;
  constructor(public payload: { error: any; }) { }
}

export type Actions = LoadingStartAction | LoadingStopAction | ErrorAction;
