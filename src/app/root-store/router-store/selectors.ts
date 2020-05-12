import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { State } from '../state';
import { RouterStateUrl } from './state';

const getRouterStateUrl = (routerState: RouterReducerState<RouterStateUrl>): RouterStateUrl => {
  if (!routerState) {
    return null;
  }

  const { state } = routerState;

  return state;
};

export const selectRouterState = createFeatureSelector<State, RouterReducerState<RouterStateUrl>>('router');

export const selectQueryParam: MemoizedSelector<object, Params> = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): Params => {
    const state = getRouterStateUrl(routerState);

    if (!!state) {
      return state.queryParams;
    }

    return null;
  }
);

export const selectRouteParam: MemoizedSelector<object, Params> = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): Params => {
    const state = getRouterStateUrl(routerState);

    if (!!state) {
      return state.params;
    }

    return null;
  }
);

export const selectRouteData: MemoizedSelector<object, Data> = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): Data => {
    const state = getRouterStateUrl(routerState);

    if (!!state) {
      return state.data;
    }

    return null;
  }
);

export const selectRouteUrl: MemoizedSelector<object, string> = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    const state = getRouterStateUrl(routerState);

    if (!!state) {
      return state.url;
    }

    return null;
  }
);
