import { Action, createReducer, on } from '@ngrx/store';

import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from './settings.actions';
import { SettingsState } from './settings.models';

export const initialState: SettingsState = {
  language: 'pt-br',
  theme: 'default-theme'
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    (state, action) => ({ ...state, ...action })
  )
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
