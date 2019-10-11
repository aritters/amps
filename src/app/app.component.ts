import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LocalStorageService, selectSettingsLanguage } from './core/core.module';
import { AppState } from './core/core.state';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from './core/settings/settings.actions';
import { selectSettingsTheme } from './core/settings/settings.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  languages = [
    { value: 'en', name: 'amps.settings.general.language.en' },
    { value: 'de', name: 'amps.settings.general.language.de' },
    { value: 'sk', name: 'amps.settings.general.language.sk' },
    { value: 'fr', name: 'amps.settings.general.language.fr' },
    { value: 'es', name: 'amps.settings.general.language.es' },
    { value: 'pt-br', name: 'amps.settings.general.language.pt-br' },
    { value: 'zh-cn', name: 'amps.settings.general.language.zh-cn' },
    { value: 'he', name: 'amps.settings.general.language.he' }
  ];

  navigation = [
    { path: '/dashboard', icon: 'dashboard', label: 'amps.navigation.dashboard' },
    { path: '/settings', icon: 'build', label: 'amps.navigation.settings' }
  ];

  themes = [
    'default-theme',
    'black-theme'
  ];

  logo = require('./../assets/img/angular-white-transparent.svg');

  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectSettingsTheme));

    this.theme$.subscribe(t => console.log(`[THEME] ${t}`));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }
}
