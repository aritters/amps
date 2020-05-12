import { RouterReducerState } from '@ngrx/router-store';

import { CoreStoreState } from './core-store';
import { JokeStoreState } from './joke-store';
import { RouterStateUrl } from './router-store/state';
import { SettingsStoreState } from './settings-store';

export interface State {
  core: CoreStoreState.State;
  settings: SettingsStoreState.State;
  joke: JokeStoreState.State;

  router: RouterReducerState<RouterStateUrl>;
}
