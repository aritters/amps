import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsContainerComponent } from './settings-container/settings-container.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsContainerComponent,
    data: { title: 'anms.navigation.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
