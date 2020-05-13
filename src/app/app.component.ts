import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoreStoreActions, CoreStoreSelectors } from './root-store/core-store';
import { State } from './root-store/state';
import { LocalStorageService } from './shared/services/local-storage.service';

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
    'dark-theme'
  ];

  logo = './../assets/img/angular-white-transparent.svg';

  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store<State>,
    private storageService: LocalStorageService
  ) {
    this.language$ = this.store.pipe(select(CoreStoreSelectors.selectLanguage));
    this.theme$ = this.store.pipe(select(CoreStoreSelectors.selectTheme));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new CoreStoreActions.ChangeLanguageAction({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new CoreStoreActions.ChangeThemeAction({ theme }));
  }
}
