import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from './../../environments/environment';
import { JokeStoreModule } from './joke-store';

@NgModule({
  imports: [
    CommonModule,
    JokeStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      name: 'Angular App Starter',
      logOnly: !environment.production
    }),
  ],
  declarations: []
})
export class RootStoreModule { }
