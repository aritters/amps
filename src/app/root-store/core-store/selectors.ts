import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { State } from './state';

export const getError = (state: State): string => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectCoreState: MemoizedSelector<object, State> = createFeatureSelector<State>('core');

export const selectCoreIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectCoreState,
  getIsLoading
);

export const selectCoreError: MemoizedSelector<object, string> = createSelector(
  selectCoreState,
  getError
);
