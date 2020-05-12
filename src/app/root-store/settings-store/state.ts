import { Language, Theme } from './models';

export interface State {
  language: Language;
  theme: Theme;
}

export const initialState: State = {
  language: 'pt-br',
  theme: 'default-theme'
};
