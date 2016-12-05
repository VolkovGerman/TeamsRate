import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {path: '', component: WelcomePageComponent},
    {path: 'team/:id', component: TeamPageComponent},
    {path: 'settings', component: SettingsPageComponent},
    {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}