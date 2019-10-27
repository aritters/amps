import { JokeStoreState } from './joke-store';
import { SettingsStoreState } from './settings-store';

export interface State {
  joke: JokeStoreState.State;
  settings: SettingsStoreState.State;
}
