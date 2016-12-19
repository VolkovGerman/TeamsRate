import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
    {path: '', component: WelcomePageComponent},
    {path: 'team/:id', component: TeamPageComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}