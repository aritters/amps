import { Action } from '@ngrx/store';

import { Theme } from '../../shared/models';

export enum ActionTypes {
  CHANGE_THEME = '[Settings] Change Theme'
}

export class ChangeThemeAction implements Action {
  readonly type = ActionTypes.CHANGE_THEME;
  constructor(public theme: Theme) { }
}

export type Actions = ChangeThemeAction;
