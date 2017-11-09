import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {routing} from './app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {APP_INITIALIZER} from '@angular/core'
//import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2PaginationModule} from 'ng2-pagination';
// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};
//----

import {NotificationModule} from './com/notifications/com.notification.module';
import {NotificationRouting} from './com/notifications/com.notification.routing';
import {DrugModule} from './com/drug/com.drug.module';
import {DrugRouting} from './com/drug/com.drug.routing'
//import { DashboardModule } from './com/dashboard/com.dashboard.module.js';
import { UserMgmtModule } from './com/usermgmt/com.usermgmt.module';
import {UsermgmtRouting} from './com/usermgmt/com.usermgmt.routing';
import { HomeModule } from './com/home/com.home.module';
import { CommonModule } from './com/common/com.common.module';
import {ConfigService} from './com/common/service/config/com.common.service.config.configmanager';
import {AppUtil} from './app.util';
import {Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import {Keepalive} from '@ng-idle/keepalive';
import { CKEditorModule } from 'ng2-ckeditor';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
@NgModule({
  imports:      [ 
     BrowserModule , 
   //  CommonModule, 
  //   DashboardModule,
     HomeModule,
     UserMgmtModule,
  //   NgxPaginationModule,
     NotificationModule,
     DrugModule,
     DrugRouting,
     UsermgmtRouting,
     NgIdleKeepaliveModule.forRoot(),
     FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
     NotificationRouting,
     routing],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, 

  ConfigService,
      {
      provide: APP_INITIALIZER,
      useFactory:AppUtil.initFactory,
     // useFactory: (config:ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }


  ]
  
})


export class AppModule { }

