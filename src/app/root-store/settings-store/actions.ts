import { Action } from '@ngrx/store';

import { Language, Theme } from './models';

export enum ActionTypes {
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

export type Actions = ChangeLanguageAction | ChangeThemeAction;
