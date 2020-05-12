import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Language, Theme } from './models';
import { State } from './state';

const getLanguage = (state: State): Language => state.language;

const getTheme = (state: State): Theme => state.theme;

export const selectSettings: MemoizedSelector<object, State> = createFeatureSelector<State>('settings');

export const selectTheme: MemoizedSelector<object, Theme> = createSelector(
  selectSettings,
  getTheme
);

export const selectLanguage: MemoizedSelector<object, Language> = createSelector(
  selectSettings,
  getLanguage
);
