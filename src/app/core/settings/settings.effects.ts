import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { merge, of } from 'rxjs';
import { distinctUntilChanged, filter, tap, withLatestFrom } from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../services/local-storage.service';
import { TitleService } from '../title/title.service';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from './settings.actions';
import { State } from './settings.models';
import { selectSettingsLanguage, selectSettingsTheme } from './settings.selectors';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('amps-init-effect-trigger');

@Injectable()
export class SettingsEffects {

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private titleService: TitleService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) { }

  @Effect({ dispatch: false })
  persistSettings = () =>
    this.actions.pipe(
      ofType(
        actionSettingsChangeLanguage,
        actionSettingsChangeTheme
      ),
      withLatestFrom(this.store.pipe(select(selectSettingsState))),
      tap(([action, settings]) =>
        this.localStorageService.setItem(SETTINGS_KEY, settings)
      )
    )

  @Effect({ dispatch: false })
  updateTheme = () =>
    merge(INIT, this.actions.pipe(ofType(actionSettingsChangeTheme))).pipe(
      withLatestFrom(this.store.pipe(select(selectSettingsTheme))),
      tap(([action, theme]) => {
        const classList = document.body.classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        if (toRemove.length) {
          classList.remove(...toRemove);
        }
        classList.add(theme);
      })
    )

  @Effect({ dispatch: false })
  setLanguage = () =>
    this.store.pipe(
      select(selectSettingsLanguage),
      distinctUntilChanged(),
      tap(language => this.translateService.use(language))
    )

  @Effect({ dispatch: false })
  setTitle = () =>
    merge(
      this.actions.pipe(ofType(actionSettingsChangeLanguage)),
      this.router.events.pipe(filter(event => event instanceof ActivationEnd))
    ).pipe(
      tap(() => {
        this.titleService.setTitle(
          this.router.routerState.snapshot.root,
          this.translateService
        );
      })
    )
}
