import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Action, StoreConfig, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from './../../environments/environment';
import { CoreStoreModule } from './core-store/core-store.module';
import { JokeStoreModule } from './joke-store';
import { metaReducers } from './reducer';
import { RouterStoreModule } from './router-store';
import { SettingsStoreModule } from './settings-store';

const storeConfig: StoreConfig<unknown, Action> = { metaReducers };

@NgModule({
  imports: [
    CommonModule,
    RouterStoreModule,
    CoreStoreModule,
    SettingsStoreModule,
    JokeStoreModule,
    StoreModule.forRoot({}, storeConfig),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      name: 'Angular App Starter',
      logOnly: !environment.production
    }),
    StoreRouterConnectingModule
  ],
  declarations: []
})
export class RootStoreModule { }
