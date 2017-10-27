import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router,Route,ActivatedRoute,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {AlertService} from '../../../common/service/alert/com.common.service.alertservice';
import { RestApiService} from '../../../common/service/restapi/com.common.service.restapiservice';
import {SessionDataService} from '../../../common/service/com.common.sessiondata';
import {Notifications} from '../../model/com.notifications.model.notification';
import {NotificationsService} from '../../service/com.notifications.service';
import {BaseComponent} from '../../../common/basic/com.common.basic.basecomponent';
@Component({
    selector:'search-notification',
    templateUrl:'com.notifications.searchnotification.html',
    styleUrls:['../styles/com.notification.css'],
    providers: [SessionDataService,NotificationsService,RestApiService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class SearchNotificationComponent extends BaseComponent{
    notifications : Notifications[];
    x: Notifications;
    private data:string[]=[];
    location: Location;
    count:number;
    fakeArray: any;
    selectedItem: number;
lastPage : number;
 private currentPage: number = 0;
    
@ViewChild('searchBox') searchBox:ElementRef;
    constructor(private _router: Router,
    injector:Injector,
            private _notificationsService: NotificationsService,
     private _restApiService:RestApiService,  ){
            super(injector); 
            this.getData();
           //  SessionDataService.getInstance().setMessage("this is a common message");        
    }
ngOnInit() {


         var keyups = Observable.fromEvent(this.searchBox.nativeElement,"keyup")
                                 .map(event=>event['target'].value)
                              // .filter(text=> text.length>=3)
                               .debounceTime(400)
                               .distinctUntilChanged()
                               .map(searchTerm=> {
                                  console.log("searchTerm.."+searchTerm);
                                 // alert(searchTerm);
                                       var searchRequest = {
                                        text: searchTerm
                                      };

                                  this._notificationsService.searchNotifications(searchRequest).then(res => this.cb_searchNotification(res));
                                });
        keyups.subscribe(data=> console.log("keyup"+data));
        
  }

  cb_searchNotification(res){
    
    this.notifications = res.notifications;
   // console.log(JSON.stringify(this.drugs));
  }
    getData(){
         var getNotificationRequest = {
                cutOffDate:""                
              };          
          this._notificationsService.getLatestNotifications(getNotificationRequest).then(res => this.cb_getData(res));
    }
    cb_getData(res){
        this.notifications = res.notifications;  
        this.count = res.count;
        var i = this.count/10;
         this.lastPage = Math.floor(i);
        console.log("count"+this.count);
        console.log("count the i "+ Math.floor(i));
       
        this.fakeArray = new Array(Math.floor(i)+1);
    }
    cb_getDataPagination(res){
       this.notifications = res.notifications;
        console.log("pagination "+this.currentPage)
    }
    cb_getPreviousPage(res){
        this.notifications = res.notifications;
        this.currentPage = this.currentPage -1;
        console.log("previous "+this.currentPage);
    }    
    cb_getNextPage(res){
        this.notifications = res.notifications;
        this.currentPage = this.currentPage + 1;
        console.log("llloo "+this.currentPage)
    }
    
    pagination(index){
       var limitfrom = index+1;
         this.selectedItem = index
        this.currentPage = index;
        console.log("pagination number "+limitfrom);
        var paginationRequest = {
            cutOffDate:"",
            id:limitfrom
        }
        this._notificationsService.getDataNotifications(paginationRequest).then(res => this.cb_getDataPagination(res));
    }
    previous(){
        this.selectedItem = this.currentPage - 1;
        var paginationRequest = {
            cutOffDate:"",
            id:this.currentPage
        }
       this._notificationsService.getDataNotifications(paginationRequest).then(res =>this.cb_getPreviousPage(res));
        console.log("previous value "+this.currentPage)
    }
    next(){
        this.selectedItem = this.currentPage + 1;
        if(this.currentPage === 0)
            this.currentPage =0
        var next = this.currentPage +2;
        console.log("next "+this.currentPage)
        var paginationRequest = {
            cutOffDate:"",
            id:next
        }
       this._notificationsService.getDataNotifications(paginationRequest).then(res =>this.cb_getNextPage(res));
        
    }
    showAddNotificationForm(){
        this._router.navigate(['dashboard1/addnotification']);
    }

    editNotification(id){
        this._router.navigate(['dashboard1/edit-notification/'+id]);
    }
    modelNotification(id){
         this._notificationsService.viewNotification(id).then(res => this.cb_viewNotification(res));
    }
    cb_viewNotification(res){
    if(res.isSuccess){
      this.x = res.notifications;
    }
}
    deleteNotification(id:number, index: number){
        this._notificationsService.deleteNotifications({notificationId:id}).then(res=> this.notifications.splice(index,1) );
    }
}

