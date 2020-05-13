import { Settings } from './models';

export interface State {
  isLoading: boolean;
  error: string;
  settings: Settings;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  settings: {
    language: 'pt-br',
    theme: 'default-theme'
  }
};
