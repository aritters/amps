import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('core', featureReducer),
    EffectsModule.forFeature([CoreStoreEffects])
  ],
  providers: [CoreStoreEffects]
})
export class CoreStoreModule { }
