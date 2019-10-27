import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Theme } from '../../shared/models';
import { State } from './state';

const getTheme = (state: State): Theme => state.theme;

export const selectSettingsState: MemoizedSelector<object, State> = createFeatureSelector<State>('settings');

export const selectSettingsTheme: MemoizedSelector<object, Theme> = createSelector(selectSettingsState, getTheme);
