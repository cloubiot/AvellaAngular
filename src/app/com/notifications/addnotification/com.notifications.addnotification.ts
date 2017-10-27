import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
import {  ActivatedRoute } from '@angular/router';

import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import { RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import {Notifications} from '../model/com.notifications.model.notification'
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {NotificationsService}from '../service/com.notifications.service';
@Component({
  moduleId: module.id,
  selector: 'addnotification',
  templateUrl: 'com.notification.addnotification.html',
  styleUrls:['../searchnotification/styles/com.notification.css'],
  providers: [SessionDataService,NotificationsService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AddNotificationComponent extends BaseComponent{
  public uploader:FileUploader ;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  private PRES_UPLOAD_URL =  this._APIURL+ "/upload/productImageUploader";
  subscription;
notificationForm : FormGroup;
notifications = new Notifications();
 uploadedFiles =[];
 content:any;
  isNotificationImageAvailable:boolean;
constructor(private _router: Router,
            injector:Injector,
            private _notificationService: NotificationsService,
            private _route : ActivatedRoute,
     private _restApiService:RestApiService,
             private fb: FormBuilder){
                 super(injector);

this.notificationForm = this.fb.group({ 
        _text: new FormControl('',Validators.required), 
    // _text: ['',Validators.required],
        _status: ['',Validators.required],
        _createdDate: ['',Validators.required],
        _content: ['',Validators.required],
        _contentUrl: ['',Validators.required]
      });
       this.uploader = new FileUploader({url: this.PRES_UPLOAD_URL});
   
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.uploadedFiles.push(response)
            this.notifications.imageUrl= response;
            this.isNotificationImageAvailable=true;
            
        };
}


   ngOnInit(){
   // alert(JSON.stringify(this._route.params));
  
    this.subscription= this._route.params.subscribe(params=>{
         var id=+params["id"];
       //  alert(id)
         if(Number.isInteger(id)){
           //this.order = this.getEmptyOrderObj();
          // alert(1)
           this._notificationService.viewNotification(id).then(res => this.cb_viewNotification(res));
           this._notificationService.notificationContent(id).then(res => this.cb_notificationContent(res))
         }else{
         // alert('Error Occurred');
          //this.order = this._sessionStorageService.getObject("placeOrderResponse");
         }
    });
  }
  cb_viewNotification(res){
    if(res.isSuccess){
      console.log(res.notifications)
      this.notifications = res.notifications;    
       if(this.notifications.imageUrl=='' || this.notifications.imageUrl==null || this.notifications.imageUrl=='drugrx.png') {
          this.isNotificationImageAvailable=false;
        }else{
          this.isNotificationImageAvailable=true;
        }
     
    }else{
       alert('Error Occurred');
    }
  }
  cb_notificationContent(res){
    console.log("response"+res)
    this.notifications.content = res;
  }
addNotification(){
    console.log(this.notifications);
   // alert(JSON.stringify(this.notifications));
    var request = {
        notifications : this.notifications
    }
  
       this._notificationService.addNotifications(request).then(res =>this.notification_success(res)) ;
 }
  
 notification_success(res){
     console.log(res);
     if(res.isSuccess){
         this._router.navigate(['dashboard1/search-notification']);
         //alert("Added");
     }
     else{
         alert("Failed")
     }
 }
 onReady(event){
   console.log(event)
 }
 
   public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  public dragFileAccepted(e:any):void{
    setTimeout(() => {
       this.upload();
    }, 300);

  }

  public upload(){
    //  alert(this.uploader.queue.length)
        for (let item of this.uploader.queue) {
            if(!item.isSuccess){
                console.log("Uploading ..."+item._file);
                item.upload()
            }
            
      }
  }
  deleteProductImage(id){
    if(id==0){
      this.notifications.imageUrl='';
      this.isNotificationImageAvailable=false;
      return;
    }
      var request = {
        id: id
     };
     this._notificationService.deleteImageUrl(id).then(res => this.cb_deleteProductImage(res));
  }
  cb_deleteProductImage(res){
    if (res.isSuccess) {
      // alert(res.id);
      AlertService.getInstance().publishMessage('Success',  ' image has been deleted.');
      this.notifications.imageUrl='';
      this.isNotificationImageAvailable=false;
    } else {
      alert('Error occured');
    }
  }
 backToSearch(){
     this._router.navigate(['dashboard1/search-notification']);
 }
}