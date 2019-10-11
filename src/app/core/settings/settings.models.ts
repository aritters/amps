import { AppState } from '../core.module';

export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he';
export type Theme = 'default-theme' | 'light-theme' | 'nature-theme' | 'dark-theme';

export interface SettingsState {
  language: Language;
  theme: Theme;
}

export interface State extends AppState {
  settings: SettingsState;
}
