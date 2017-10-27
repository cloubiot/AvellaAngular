import { Component,ViewChild,ElementRef,Input } from '@angular/core';
import { Router,Route,ActivatedRoute,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice';
import {Drug,DrugTables} from '../model/com.drug.addDrug.model'
import {DrugService} from '../service/com.drug.service';
@Component({
    selector: 'drug-preview',
    templateUrl: 'com.drug.drugpreview.html',
    styleUrls:['../searchdrug/styles/com.drug.css'],
    providers: [DrugService],
})
export class DrugPreviewComponent extends BaseComponent{

drugDb : any;
 constructor(private _router: Router,
    injector:Injector,
            private _drugService: DrugService
       ){
       super(injector);
       this.getData();
     }
   ngOnInit() {
            this._drugService.getDrugDb().then(res => this.cb_getData(res));       
   }

    getData(){
      this._drugService.getDrugDb().then(res => this.cb_getData(res));
    }
    cb_getData(res){
      console.log(res.drugdb)
      this.drugDb = res.drugdb;
    }  
        
  
}