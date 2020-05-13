export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he';
export type Theme = 'default-theme' | 'dark-theme';

export interface Settings {
  language: Language;
  theme: Theme;
}
