import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsListPageComponent } from './teams-list-page/teams-list-page.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomePageComponent},
    {path: 'feed', component: FeedPageComponent},
    {path: 'teams', component: TeamsListPageComponent},
    {path: 'team/:id', component: TeamPageComponent},
    {path: 'todo', component: TodosPageComponent},
    {path: 'settings', component: SettingsPageComponent},
    {path: 'search', component: SearchPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}