import { Component,Pipe,ViewChild,ElementRef,Input } from '@angular/core';
import { Router,Route,ActivatedRoute,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
//import {NgxPaginationModule} from 'ngx-pagination';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { RestApiService} from '../../../common/service/restapi/com.common.service.restapiservice';
import {SessionDataService} from '../../../common/service/com.common.sessiondata';
import {DrugService} from '../../service/com.drug.service';
import {BaseComponent} from '../../../common/basic/com.common.basic.basecomponent';
import {AlertService} from '../../../common/service/alert/com.common.service.alertservice';
import {Drug,DrugTables} from '../../model/com.drug.addDrug.model'
@Component({
    selector:'search-drug',
    templateUrl:'com.drug.searchdrug.html',
    styleUrls:['../styles/com.drug.css'],
    providers: [SessionDataService,DrugService,RestApiService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],

})
export class SearchDrugComponent extends BaseComponent{
  drugs : Drug[];
  drugDb : any;
  drugCategorys: any;
count:number;
selectedItem: number;
lastPage : number;
    fakeArray: any;
     private currentPage: number = 0;
@ViewChild('searchBox') searchBox:ElementRef;

    constructor(private _router: Router,
    injector:Injector,
            private _drugService: DrugService,
     private _restApiService:RestApiService,  ){
            super(injector); 
            this.getData();
            this.getCategory();
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
                                        drugName : searchTerm
                                      };

                                  this._drugService.searchDrug(searchRequest).then(res => this.cb_searchDrug(res));
                                });
        keyups.subscribe(data=> console.log("keyup"+data));
       
        
  }

  cb_searchDrug(res){
    
    this.drugDb = res.drug;
   
    console.log(JSON.stringify(this.drugs));
  }
   getData(){         
          this._drugService.getDrugDb().then(res => this.cb_getData(res));
    }
    cb_getData(res){
        this.drugDb = res.drugdb;
        this.count = res.count;
        var i = ~~this.count/10;
        this.lastPage = Math.floor(i);
        console.log("count"+this.count);
        console.log("count the i "+ Math.floor(i));
       
        this.fakeArray = new Array(Math.floor(i)+1);
    }
    
    cb_getDataPagination(res){
        this.drugDb = res.drugdb;
        console.log("pagination "+this.currentPage)
    }
    cb_getPreviousPage(res){
        this.drugDb = res.drugdb;
        this.currentPage = this.currentPage -1;
        console.log("previous "+this.currentPage);
    }    
    cb_getNextPage(res){
        this.drugDb = res.drugdb;
        this.currentPage = this.currentPage + 1;
        console.log("llloo "+this.currentPage)
    }
    pagination(index){
        var limitfrom = index+1;
         this.selectedItem = index
        this.currentPage = index;
        console.log("pagination number "+limitfrom);
        this._drugService.getDrugForPagination(limitfrom).then(res=>this.cb_getDataPagination(res));
    }
    previous(){
        this.selectedItem = this.currentPage - 1;
        this._drugService.getDrugForPagination(this.currentPage).then(res=>this.cb_getPreviousPage(res));
        console.log("previous value "+this.currentPage)
    }
    next(){
        this.selectedItem = this.currentPage + 1;
        if(this.currentPage === 0)
            this.currentPage =0
        var next = this.currentPage +2;
        console.log("next "+this.currentPage)
        this._drugService.getDrugForPagination(next).then(res=>this.cb_getNextPage(res));
        
    }
    getCategory(){
    this._restApiService.get("/drug/getDrugData/").then(res => this.cb_getCategory(res));
   // this._drugService.getDrugData().then(res=>this.cb_getCategory(res));
    }
    cb_getCategory(res){
        console.log(res.drugCategory);
        this.drugCategorys = res.drugCategory;
    }
    editDrug(id){
        this._router.navigate(['dashboard1/edit-drug/'+id]);
    }
    showAddDrugForm(){
        this._router.navigate(['dashboard1/add-drug']);
    }
    showPreview(){
        this._router.navigate(['dashboard1/drug-preview']);
    }
    deleteDrug(id:number,index:number){

        this._drugService.deleteDrug({drugId:id}).then(res=>this.drugs.splice(index,1));
    }
    cb_deleteDrug(res){
        if(res.isSuccess){
        this.getData();
        AlertService.getInstance().publishMessage('success', ' Drug has deleted successfully!'); 
    }
    }
}