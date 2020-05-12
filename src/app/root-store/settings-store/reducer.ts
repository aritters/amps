import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      };
    }
    case ActionTypes.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language
      };
    }
    default: {
      return state;
    }
  }
}
