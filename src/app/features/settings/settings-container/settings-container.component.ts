import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from '../../../core/settings/settings.actions';
import { SettingsState, State } from '../../../core/settings/settings.models';
import { selectSettings } from '../../../core/settings/settings.selectors';

@Component({
  selector: 'anms-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'default-theme', label: 'blue' },
    // { value: 'light-theme', label: 'light' },
    // { value: 'nature-theme', label: 'nature' },
    { value: 'black-theme', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'de', label: 'de' },
    { value: 'sk', label: 'sk' },
    { value: 'fr', label: 'fr' },
    { value: 'es', label: 'es' },
    { value: 'pt-br', label: 'pt-br' },
    { value: 'zh-cn', label: 'zh-cn' },
    { value: 'he', label: 'he' }
  ];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }
}
