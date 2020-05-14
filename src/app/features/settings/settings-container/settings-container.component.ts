import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState } from './../../../root-store';
import { CoreStoreActions, CoreStoreSelectors } from './../../../root-store/core-store';
import { Settings } from './../../../root-store/core-store/models';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {
  settings$: Observable<Settings>;

  themes = [
    { value: 'default-theme', label: 'blue' },
    { value: 'dark-theme', label: 'dark' }
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

  constructor(
    private store$: Store<RootStoreState.State>,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.settings$ = this.store$.pipe(select(CoreStoreSelectors.selectSettings));

    this.notificationService.error('teste');
    this.notificationService.info('teste');
    this.notificationService.success('teste');
    this.notificationService.warn('teste');
  }

  onLanguageSelect({ value: language }) {
    this.store$.dispatch(new CoreStoreActions.ChangeLanguageAction({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store$.dispatch(new CoreStoreActions.ChangeThemeAction({ theme }));
  }
}
