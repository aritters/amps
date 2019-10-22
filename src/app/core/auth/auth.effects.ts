import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../services/local-storage.service';
import { authLogin, authLogout } from './auth.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  @Effect({ dispatch: false })
  login = () =>
    this.actions$.pipe(
      ofType(authLogin),
      tap(() =>
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
      )
    )

  @Effect({ dispatch: false })
  logout = () =>
    this.actions$.pipe(
      ofType(authLogout),
      tap(() => {
        this.router.navigate(['']);
        this.localStorageService.setItem(AUTH_KEY, {
          isAuthenticated: false
        });
      })
    )
}
