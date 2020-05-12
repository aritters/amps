import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

import { environment } from './../../environments/environment';
import { State } from './state';

export function debug(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const newState = reducer(state, action);
    console.log(`[DEBUG] action: ${action.type}`, {
      payload: (action as any).payload,
      oldState: state,
      newState
    });
    return newState;
  };
}

export const metaReducers: MetaReducer<State, Action>[] = [];

if (environment.debug) {
  metaReducers.unshift(debug);
}
