import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { FullTaskComponent } from './full-task/full-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskBuilderComponent } from './task-builder/task-builder.component';
import { MembersRateComponent } from './members-rate/members-rate.component';
import { TeamSettingsComponent } from './team-settings/team-settings.component';
import { TeamsSearchComponent } from './teams-search/teams-search.component';
import { TeamBuilderComponent } from './team-builder/team-builder.component';
import { EmptyBoxComponent } from './empty-box/empty-box.component';

import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserBlockComponent } from './user-block/user-block.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    TeamPageComponent,
    SettingsPageComponent,
    DashboardComponent,
    TeamsListComponent, 
    FullTaskComponent,
    TaskListComponent,
    TaskBuilderComponent,
    MembersRateComponent,
    TeamSettingsComponent,
    TeamsSearchComponent,
    TeamBuilderComponent,
    EmptyBoxComponent,
    NotFoundComponent,
    UserBlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard, 
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
