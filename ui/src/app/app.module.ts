import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamsListPageComponent } from './teams-list-page/teams-list-page.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

import { AppRoutingModule } from './app-routing.module';
import { TaskComponent } from './task/task.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CreateTaskComponent } from './create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    FeedPageComponent,
    TeamPageComponent,
    TeamsListPageComponent,
    TodosPageComponent,
    SettingsPageComponent,
    TaskComponent,
    TeamCardComponent,
    SearchPageComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
