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
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {Drug, DrugCategory} from '../model/com.drug.addDrug.model';
import {DrugService} from '../service/com.drug.service';
import {UniqueUsernameValidators} from '../../usermgmt/signup/validators/com.usermgmt.uniqueuser.validator'
@Component({
    selector:'add-drug',
    templateUrl: 'com.drug.addDrug.html',
    styleUrls:['../searchdrug/styles/com.drug.css'],
     providers: [SessionDataService,DrugService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AddDrugComponent extends BaseComponent{

    drugForm: FormGroup;
    drug = new Drug();
    drugCategorys: any;
    subscription;
    constructor(private _router: Router,
            injector:Injector,
            private _drugService: DrugService,
            private _route : ActivatedRoute,
     private _restApiService:RestApiService,
             private fb: FormBuilder){
                 super(injector);
                 this.getCategory();
this.drugForm = this.fb.group({ 
       
         _drugName: ['',Validators.required],
        _indicationsUsage: ['',Validators.required],
        _dosageAdministration: ['',Validators.required],
        _dosageFormStrength: ['',Validators.required],
        _contraindictions: ['',Validators.required],
        _warningsPrecaustions: ['',Validators.required],
        _adverseReactions: ['',Validators.required],
        _drugInteractions: ['',Validators.required],
        _useInSpecificPopulations: ['',Validators.required],
        _availableAtAvella: ['',Validators.required],
        _siteUrl: ['',Validators.required],
        _drugType: ['',Validators.required],
        _prescribingInfo: ['',Validators.required],
        _tradeMark: ['', Validators.required],
        _drugCategoryId: ['',Validators.required]
       
});
}
getCategory(){
    this._restApiService.get("/drug/getDrugData/").then(res => this.cb_getCategory(res));
   // this._drugService.getDrugData().then(res=>this.cb_getCategory(res));
}
cb_getCategory(res){
    console.log(res.drugCategory);
    this.drugCategorys = res.drugCategory;
}
ngOnInit(){
   // alert(JSON.stringify(this._route.params));
    this.subscription= this._route.params.subscribe(params=>{
         var id=+params["id"];
       //  alert(id)
         if(Number.isInteger(id)){
         this._drugService.viewDrug(id).then(res => this.cb_viewDrug(res));
         }else{
           //
         }
    });
  }
  cb_viewDrug(res){
    if(res.isSuccess){
      this.drug = res.drug;
    }else{
       alert('Error Occurred');
    }
  }

addDrug(){
    console.log(this.drug);
   // alert(JSON.stringify(this.notifications));
    var request = {
        drug : this.drug
    }
  
       this._drugService.addDrug(request).then(res =>this.addDrug_success(res)) ;
 }
  
 addDrug_success(res){
     console.log(res);
     if(res.isSuccess){
         this._router.navigate(['dashboard1/search-drug']);
         //alert("Added");
     }
     else{
         alert("Failed")
     }
 }
 backToSearch(){
     this._router.navigate(['dashboard1/search-drug']);
 }
}