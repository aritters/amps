import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Language, Settings, Theme } from './models';
import { State } from './state';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;
const getLanguage = (state: State): Language => state.settings?.language;
const getTheme = (state: State): Theme => state.settings?.theme;

export const selectCoreState: MemoizedSelector<object, State> = createFeatureSelector<State>('core');

export const selectSettings: MemoizedSelector<object, Settings> = createSelector(
  selectCoreState,
  getSettings
);

export const selectTheme: MemoizedSelector<object, Theme> = createSelector(
  selectCoreState,
  getSettings,
  getTheme
);

export const selectLanguage: MemoizedSelector<object, Language> = createSelector(
  selectCoreState,
  getSettings,
  getLanguage
);

export const selectCoreIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectCoreState,
  getIsLoading
);

export const selectCoreError: MemoizedSelector<object, string> = createSelector(
  selectCoreState,
  getError
);
