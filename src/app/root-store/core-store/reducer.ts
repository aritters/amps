import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOADING_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOADING_STOP: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.ERROR: {

      return {
        ...state,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
