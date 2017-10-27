import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent }   from './header/com.common.header';
import { FooterComponent }   from './footer/com.common.footer';
import { Menu }   from './menu/com.common.menu';
import { HomeMenu }   from './menu/com.common.homemenu';
import {UserHeader} from './userheader/com.usermgmt.userheader';
import {CartCount} from './cartcount/com.common.cartcount';
import {Alert} from './alert/com.common.alert';
import {Router ,Routes, RouterModule } from '@angular/router';
//import {UserMgmtModule} from '../usermgmt/com.usermgmt.module'
import {ConfigService} from './service/config/com.common.service.config.configmanager';
import {ImageUploader} from './imageuploader/com.common.imageuploader';
import {AppUtil} from '../../app.util'
import {FileUploadModule} from "ng2-file-upload";
import {APP_INITIALIZER} from '@angular/core'
@NgModule({
  imports:      [ BrowserModule ,RouterModule,FileUploadModule],
 declarations: [ HeaderComponent, FooterComponent,UserHeader, CartCount,Menu,HomeMenu,Alert,ImageUploader],
  exports:    [  HeaderComponent,FooterComponent,UserHeader, CartCount,Menu,HomeMenu,Alert,ImageUploader],

/*providers: [

  ConfigService,
      {
      provide: APP_INITIALIZER,
      useFactory:AppUtil.initFactory,
     // useFactory: (config:ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }]*/

})
export class CommonModule { }