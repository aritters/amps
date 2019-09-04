import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { merge, of } from 'rxjs';
import { distinctUntilChanged, filter, tap, withLatestFrom } from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { TitleService } from '../title/title.service';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from './settings.actions';
import { State } from './settings.model';
import { selectSettingsLanguage, selectSettingsTheme } from './settings.selectors';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('anms-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private titleService: TitleService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) { }

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsChangeLanguage,
          actionSettingsChangeTheme
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
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
      ),
    { dispatch: false }
  );

  setLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );
}
