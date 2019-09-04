import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';
import { AuthEffects } from './auth/auth.effects';
import { AppState, metaReducers, reducers, selectRouterState } from './core.state';
import { LocalStorageService } from './local-storage/local-storage.service';
import { CustomSerializer } from './router/custom-serializer';
import { SettingsEffects } from './settings/settings.effects';
import { selectSettingsLanguage, selectSettingsTheme } from './settings/settings.selectors';
import { TitleService } from './title/title.service';

export {
  TitleService,
  LocalStorageService,
  AppState,
  selectRouterState,
  selectSettingsTheme as selectTheme,
  selectSettingsLanguage
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
      SettingsEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Angular App Starter',
      logOnly: environment.production
    }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/`, '.json'),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: [TranslateModule]
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

}
