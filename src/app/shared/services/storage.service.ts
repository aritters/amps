const APP_PREFIX = 'AMPS-';

export abstract class StorageService {
  constructor(private storage: Storage) { }

  setItem(key: string, value: any) {
    this.storage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    const val = this.storage.getItem(`${APP_PREFIX}${key.toUpperCase()}`);

    if (!!val) {
      return JSON.parse(val);
    }

    return '';
  }

  getItemAs<T>(key: string) {
    return this.getItem(key) as T;
  }

  removeItem(key: string) {
    this.storage.removeItem(`${APP_PREFIX}${key}`);
  }
}
