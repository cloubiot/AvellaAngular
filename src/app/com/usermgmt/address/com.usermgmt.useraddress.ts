import { Component,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
//----

import { UserMgmtService } from '../service/com.service.usermgmt'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {Address} from '../../common/model/com.common.model.address';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
@Component({
  moduleId: module.id,
  selector: 'user-address',
  templateUrl: 'com.usermgmt.useraddress.html',
  providers: [SessionDataService,UserMgmtService,RestApiService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class UserAddress extends BaseComponent{



   isFormValid :boolean= true;
   formValidationErrorMsg :string = "";
location: Location;
states: any;
cities: any;
address : Address;
@Output() change = new EventEmitter();
@ViewChild('addAddressButton') demo:ElementRef;
 constructor(private _router: Router,
            injector:Injector,
            private _userProfileService: UserProfileService,
                private _userMgmtService: UserMgmtService,
                private _restApiService : RestApiService,
    private fb: FormBuilder){
      super(injector); 
        this.loadAddress();
        if(!this.address){
          //alert(this.shippingAddress)
          this.address = new Address();
        }

 }
 loadAddress(){

   this.address = this._userProfileService.getUserProfileValue('address');
   if(!this.address){
     AlertService.getInstance().publishMessage('warning','User profile address required!');
   }
  this._restApiService.get("/address/getStates/").then(res => this.cb_getState(res));
   if(this.address!=null){
    this.getCities(0,this.address.state);
   }
 }
 cb_getState(res){
  // alert(JSON.stringify(res));
  this.states = res.states;
 }


 getCities(index,stateId){
  // alert(stateId);
   this._restApiService.getById("/address/getCitiesByStateName/", stateId).then(res => this.cb_getCities(res));
 }
cb_getCities(res){
  // alert(JSON.stringify(res));
  this.cities = res.cities;
 }

  addNewAddress(){
  //  alert(this.shippingAddress);
    this.address.addressType = 1;
    this.address.userId=this._userProfileService.getUserId();
    this._loggingService.logDebug(this.getName(), JSON.stringify(this.address));
//    this._userMgmtService.addNewAddress(this.address).then(res => this.cb_addNewAddress(res));
  }  
  cb_addNewAddress(res){
    if(res.isSuccess){
    this.address.id = res.id;
   // this.profileAddress = this.shippingAddress;_userProfileService
     this._userProfileService.setUserProfileValue('address',this.address);
     AlertService.getInstance().publishMessage('success','Address updated!:'+ this.address.street+"..");
   //  alert(this.demo);
     this.demo.nativeElement.click();
      alert('Address changed successfully');
      this.change.emit({addressId: res.id})
     //this.showDashboard();
     //$('.collapse').collapse()
    }
  }
  showDashboard(){
    this._router.navigate(['dashboard']);
  }

 }

  

