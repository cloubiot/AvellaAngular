import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OnInit ,OnDestroy,OnChanges,AfterViewInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';

@Component({
moduleId:module.id,
  selector: 'user-header',
  templateUrl: 'com.usermgmt.userheader.html',
  providers: [SessionStorageService]

})
export class UserHeader{
       roleId:number;
  subscription: any;
  userName:string='';  
  profileImageUrl;
  constructor(private _router: Router,
    private _sessionStorageService: SessionStorageService) {
     this.getLoggedUser()
    // alert(document.location.hostname);
 this.roleId = this._sessionStorageService.getObject("roleId");
  }
 /* ngOnInit(): void {
   let timer = TimerObservable.create(2, 1000);
    this.subscription = timer.subscribe(t => {
        console.log("YYYY##")
       
    });
    
  }
  ngAfterViewInit() {
    
   // this.setTimeOut2()
  }
  setTimeOut2(){
       setTimeout(() => {
            this.getLoggedUser()
        },100 );
  }
   ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
  */
  
  getLoggedUser(){
    //  alert(1)
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
    
        var userName;
        if(userProfileObj){
            userName = userProfileObj["firstName"];
        
        }
        if(userName!=null){
            this.userName=userName;
        }
        if(userProfileObj && userProfileObj.userExt){
         this.profileImageUrl =userProfileObj.userExt.profileImageUrl;
        }
  }
  logout(){
      this._sessionStorageService.clear();
      this.userName='';
      this._router.navigate([''])
  }
  showUserProfile(){
      this._router.navigate(['dashboard/user-profile']);
  }

}