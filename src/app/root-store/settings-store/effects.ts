import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { State } from '../state';
import * as featureActions from './actions';
import { selectSettingsState, selectSettingsTheme } from './selectors';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('amps-init-effect-trigger');

@Injectable()
export class SettingsStoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) { }

  @Effect({ dispatch: false })
  persistSettingsEffect$ = this.actions$
    .pipe(
      ofType<featureActions.ChangeThemeAction>(
        featureActions.ActionTypes.CHANGE_THEME
      ),
      withLatestFrom(this.store.pipe(select(selectSettingsState))),
      tap(([_, settings]) =>
        this.localStorageService.setItem(SETTINGS_KEY, settings)
      )
    );

  @Effect({ dispatch: false })
  initTheme = INIT
    .pipe(
      withLatestFrom(this.store.pipe(select(selectSettingsTheme))),
      tap(([_, theme]) => {
        const classList = document.body.classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        if (toRemove.length) {
          classList.remove(...toRemove);
        }
        classList.add(theme);
      })
    );

  @Effect({ dispatch: false })
  updateTheme = this.actions$
    .pipe(
      ofType<featureActions.ChangeThemeAction>(
        featureActions.ActionTypes.CHANGE_THEME
      ),
      withLatestFrom(this.store.pipe(select(selectSettingsTheme))),
      tap(([_, theme]) => {
        const classList = document.body.classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        if (toRemove.length) {
          classList.remove(...toRemove);
        }
        classList.add(theme);
      })
    );
}
