import { AppState } from '../core.module';

export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he';

export interface SettingsState {
  language: string;
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
