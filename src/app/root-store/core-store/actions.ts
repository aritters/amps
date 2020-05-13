import { Action } from '@ngrx/store';

import { Language, Theme } from './models';

export enum ActionTypes {
  LOADING_START = '[Core] Loading Start',
  LOADING_STOP = '[Core] Loading Stop',
  THROW_ERROR = '[Core] Throw Error',
  CHANGE_LANGUAGE = '[Settings] Change Language',
  CHANGE_THEME = '[Settings] Change Theme'
}

export class ChangeLanguageAction implements Action {
  readonly type = ActionTypes.CHANGE_LANGUAGE;
  constructor(public payload: { language: Language; }) { }
}

export class ChangeThemeAction implements Action {
  readonly type = ActionTypes.CHANGE_THEME;
  constructor(public payload: { theme: Theme; }) { }
}

export class LoadingStartAction implements Action {
  readonly type = ActionTypes.LOADING_START;
  constructor() { }
}

export class LoadingStopAction implements Action {
  readonly type = ActionTypes.LOADING_STOP;
  constructor() { }
}

export class ThrowErrorAction implements Action {
  readonly type = ActionTypes.THROW_ERROR;
  constructor(public payload: { error: any; }) { }
}

export type Actions =
  LoadingStartAction
  | LoadingStopAction
  | ThrowErrorAction
  | ChangeLanguageAction
  | ChangeThemeAction;
