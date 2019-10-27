import { Theme } from '../../shared/models';

export interface State {
  theme: Theme;
}

export const initialState: State = {
  theme: 'default-theme'
};
