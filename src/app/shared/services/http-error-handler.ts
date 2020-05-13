import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as coreActions from './../../root-store/core-store/actions';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  (operation?: string) => (error: HttpErrorResponse) => Observable<Action>;

/** Handles HttpClient errors */
@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {

  constructor() { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName: string) => (operation = '') => this.handleError(serviceName, operation);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError(
    serviceName = '',
    operation = 'operation',
    errorMessage: string = null) {

    const defaultMessage = 'Ops! Ocorreu um erro inexperado. Por favor tente novamente em alguns instantes';

    return (response: HttpErrorResponse): Observable<Action> => {

      console.error(`Error in ${serviceName}.${operation}`, response); // log to console instead

      if (!!errorMessage) {
        return of(new coreActions.ThrowErrorAction({ error: errorMessage }));
      }

      if (typeof response.error === 'string' || response.error instanceof String) {
        return of(new coreActions.ThrowErrorAction({ error: `${response.error}` }));
      }

      const { descricao, errors, title } = response.error || {
        descricao: null,
        title: null,
        errors: []
      };

      const { statusText } = response || { statusText: null };

      if (response.status === 400) {

        if (!!errors.length) {
          return of(new coreActions.ThrowErrorAction({ error: errors[0].message }));
        }

        if (!!descricao) {
          return of(new coreActions.ThrowErrorAction({ error: descricao }));
        }

        if (!!title) {
          return of(new coreActions.ThrowErrorAction({
            error: title === 'One or more validation errors occurred'
              ? 'Um ou mais campos não foram informados'
              : title
          }));
        }

        return of(new coreActions.ThrowErrorAction({ error: defaultMessage }));
      }

      if (response.status === 404) {

        if (!!descricao) {
          return of(new coreActions.ThrowErrorAction({ error: descricao }));
        }

        return of(new coreActions.ThrowErrorAction({ error: defaultMessage }));
      }

      if (response.status === 401) {
        return of(new coreActions.ThrowErrorAction({ error: 'Você precisa entrar para acessar este recurso' }));
      }

      if (response.status === 403) {
        return of(new coreActions.ThrowErrorAction({ error: 'Você não possui autorização para acessar este recurso' }));
      }

      if (!!descricao) {
        return of(new coreActions.ThrowErrorAction({ error: descricao }));
      }

      if (!!statusText && statusText !== 'Unknown Error') {
        return of(new coreActions.ThrowErrorAction({ error: statusText }));
      }
      // Let the app keep running by returning a safe result.
      return of(new coreActions.ThrowErrorAction({ error: defaultMessage }));
    };
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
