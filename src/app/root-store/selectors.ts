import { createSelector, MemoizedSelector } from '@ngrx/store';

import { JokeStoreSelectors } from './joke-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  JokeStoreSelectors.selectJokeError,
  (error: string) => error
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  JokeStoreSelectors.selectJokeIsLoading,
  (joke: boolean) => joke
);
