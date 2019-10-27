import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as featureActions from '../../../root-store/settings-store/actions';
import { RootStoreState } from './../../../root-store';
import { selectSettingsState } from './../../../root-store/settings-store/selectors';
import { State } from './../../../root-store/settings-store/state';

@Component({
  selector: 'amps-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {
  settings$: Observable<State>;

  themes = [
    { value: 'default-theme', label: 'blue' },
    { value: 'light-theme', label: 'light' },
    { value: 'nature-theme', label: 'nature' },
    { value: 'dark-theme', label: 'dark' }
  ];

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.settings$ = this.store$.pipe(select(selectSettingsState));
  }

  onThemeSelect({ value: theme }) {
    this.store$.dispatch(new featureActions.ChangeThemeAction(theme));
  }
}
