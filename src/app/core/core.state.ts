import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { RouterStateUrl } from './router/router.state';
import { SettingsState } from './settings/settings.models';
import { settingsReducer } from './settings/settings.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  settings: settingsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  metaReducers.unshift(debug);
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const selectSettingsState = createFeatureSelector<AppState, SettingsState>('settings');

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}
