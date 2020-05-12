import { State } from './state';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { merge, of, Observable } from 'rxjs';
import { distinctUntilChanged, filter, tap, withLatestFrom, map } from 'rxjs/operators';

import { RootStoreState } from './../../root-store';
import { LocalStorageService, TitleService } from './../../shared/services';
import * as featureActions from './actions';
import { selectLanguage, selectSettings, selectTheme } from './selectors';

const SETTINGS_KEY = 'SETTINGS';
const INIT = of('amps-init-effect-trigger');

@Injectable()
export class SettingsStoreEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<RootStoreState.State>,
    private router: Router,
    private titleService: TitleService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) { }

  @Effect({ dispatch: false })
  initThemeEffect$ = INIT
    .pipe(
      tap(() => {
        const { theme, language } = this.localStorageService.getItemAs<State>(SETTINGS_KEY) || { theme: null, language: null };

        if (!!theme) {
          this.store$.dispatch(new featureActions.ChangeThemeAction({ theme }));
        }

        if (!!language) {
          this.store$.dispatch(new featureActions.ChangeLanguageAction({ language }));
        }
      })
    );

  @Effect({ dispatch: false })
  updateThemeEffect$ =
    merge(INIT, this.actions$.pipe(ofType<featureActions.ChangeThemeAction>(featureActions.ActionTypes.CHANGE_THEME)))
      .pipe(
        withLatestFrom(this.store$.pipe(select(selectTheme))),
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
      );

  @Effect({ dispatch: false })
  persistSettingsEffect$ =
    this.store$.pipe(
      select(selectSettings),
      distinctUntilChanged(),
      tap(settings => {
        this.localStorageService.setItem(SETTINGS_KEY, settings);
      })
    );

  @Effect({ dispatch: false })
  setLanguageEffect$ =
    this.store$.pipe(
      select(selectLanguage),
      distinctUntilChanged(),
      tap(language => this.translateService.use(language))
    );

  @Effect({ dispatch: false })
  setTitleEffect$ =
    merge(
      this.actions$.pipe(ofType<featureActions.ChangeLanguageAction>(featureActions.ActionTypes.CHANGE_LANGUAGE)),
      this.router.events.pipe(filter(event => event instanceof ActivationEnd))
    ).pipe(
      tap(() => {
        this.titleService.setTitle(
          this.router.routerState.snapshot.root,
          this.translateService
        );
      })
    );
}
