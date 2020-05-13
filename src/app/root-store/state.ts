import { RouterReducerState } from '@ngrx/router-store';

import { CoreStoreState } from './core-store';
import { JokeStoreState } from './joke-store';
import { RouterStateUrl } from './router-store/state';

export interface State {
  core: CoreStoreState.State;
  joke: JokeStoreState.State;
  router: RouterReducerState<RouterStateUrl>;
}
