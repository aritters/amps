import { ActionReducer } from '@ngrx/store';

import { AppState } from '../core.state';
import { environment } from './../../../environments/environment';

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);

    if (!environment.production) {
      console.log(`[DEBUG] action: ${action.type}`, {
        payload: (action as any).payload,
        oldState: state,
        newState
      });
    }

    return newState;
  };
}
