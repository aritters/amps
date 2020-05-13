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
    case ActionTypes.THROW_ERROR: {

      return {
        ...state,
        error: action.payload.error
      };
    }
    case ActionTypes.CHANGE_THEME: {
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload.theme
        }
      };
    }
    case ActionTypes.CHANGE_LANGUAGE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload.language
        }
      };
    }
    default: {
      return state;
    }
  }
}
