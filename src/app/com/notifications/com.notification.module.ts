import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {CommonModule} from '../common/com.common.module';
import { CKEditorModule } from 'ng2-ckeditor';

import {RestApiService} from '../common/service/restapi/com.common.service.restapiservice'
import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {DashboardComponent} from './dashboard/com.dashboard';
import {SearchNotificationComponent} from './searchnotification/ui/com.notifications.searchnotification'
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {LoggingService} from '../common/service/logging/com.common.service.logging';
import {FileUploadModule} from "ng2-file-upload";
import {AddNotificationComponent} from './addnotification/com.notifications.addnotification';
import {NotificationsService} from './service/com.notifications.service';

@NgModule({
  imports:      [ BrowserModule ,FormsModule,HttpModule,CKEditorModule,ReactiveFormsModule,RouterModule,CommonModule,FileUploadModule],
  declarations: [ DashboardComponent,SearchNotificationComponent,AddNotificationComponent],
  exports:    [DashboardComponent,SearchNotificationComponent,AddNotificationComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
              SessionStorageService,RestApiService,
              UserProfileService,
              LoggingService]
})
export class NotificationModule { }
