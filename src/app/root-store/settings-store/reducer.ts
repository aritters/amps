import { INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case INIT.toString(): {
      const { settings } = LocalStorageService.loadInitialState();
      return Object.assign({ ...state }, { ...settings });
    }
    case UPDATE.toString(): {
      const { settings } = LocalStorageService.loadInitialState();
      return Object.assign({ ...state }, { ...settings });
    }
    case ActionTypes.CHANGE_THEME: {
      return {
        ...state,
        ...action
      };
    }
    default: {
      return state;
    }
  }
}
