import { Injectable } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

const APP_PREFIX = 'LINX-PAYWORKS-';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  constructor() { }

  static loadInitialState() {
    return Object.keys(sessionStorage)
      .filter(key => key.includes(APP_PREFIX))
      .reduce((state: any, storageKey) => {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );

        let currentStateRef = state;

        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(sessionStorage.getItem(storageKey));
            return;
          }

          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });

        return state;
      }, {});
  }

  setItem(key: string, value: any) {
    const valueJson = JSON.stringify(value);
    sessionStorage.setItem(`${APP_PREFIX}${new UpperCasePipe().transform(key)}`, valueJson);
  }

  getItem(key: string) {
    let val = sessionStorage.getItem(`${APP_PREFIX}${new UpperCasePipe().transform(key)}`);

    if (val && val !== 'undefined')
      return JSON.parse(val);

    return '';
  }

  getItemAs<T>(key: string) {
    return this.getItem(key) as T;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(`${APP_PREFIX}${new UpperCasePipe().transform(key)}`);
  }
}
