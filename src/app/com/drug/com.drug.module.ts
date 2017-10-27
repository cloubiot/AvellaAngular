import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {CommonModule} from '../common/com.common.module';
import {AuthGuard} from './gaurd/com.usermgmt.gaurd'

import {RestApiService} from '../common/service/restapi/com.common.service.restapiservice'
import {SearchDrugComponent} from './searchdrug/ui/com.drug.searchdrug'
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {LoggingService} from '../common/service/logging/com.common.service.logging';
import {FileUploadModule} from "ng2-file-upload";
import {AddDrugComponent} from './addDrug/com.drug.addDrug';
import {DrugPreviewComponent} from './drugpreview/com.drug.drugpreview'
@NgModule({
  imports:      [ BrowserModule ,FormsModule,HttpModule,ReactiveFormsModule,RouterModule,CommonModule,FileUploadModule],
  declarations: [ SearchDrugComponent,AddDrugComponent,DrugPreviewComponent],
  exports:    [SearchDrugComponent,AddDrugComponent,DrugPreviewComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
              SessionStorageService,RestApiService,AuthGuard,
              LoggingService]
})
export class DrugModule { }