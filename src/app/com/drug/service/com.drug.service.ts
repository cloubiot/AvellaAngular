import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';

@Injectable()
export class DrugService extends BaseService{
     private GET_DATA_URL = this._APIURL + '/dataSync/getData';
     private SEARCH_DRUG_URL =  this._APIURL + '/drug/searchDrug';
     private ADD_UPDATE_DRUG_URL = this._APIURL + '/drug/addUpdateDrug';
     private GET_DRUG_DB_URL = this._APIURL + '/drug/getDrugData';
     private GET_DRUG_URL = this._APIURL + '/drug/getDrug';
     private DELETE_DRUG_URL = this._APIURL + '/drug/deleteDrug';
     private GET_DRUG_TABLES_URL = this._APIURL + '/drug/getDrugDb';
     private DRUG_FOR_PAGINATION_URL = this._APIURL + '/drug/getDrugDb'
     constructor(injector:Injector){
        super(injector);
    }
    getData(request: any) : Promise<any>{
        return this._http.post(this.GET_DATA_URL , JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    searchDrug(request: any) : Promise<any>{
        return this._http.post(this.SEARCH_DRUG_URL, JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    addDrug(request: any) :Promise<any> {
        return this._http.post(this.ADD_UPDATE_DRUG_URL, JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    getDrugData(){
        return this._http.get(this.GET_DRUG_DB_URL,this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    viewDrug(id: number): Promise<any> {
        return this._http.get(this.GET_DRUG_URL+"/"+id ,  this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    deleteDrug(request:any) : Promise<any> {
        return this._http.post(this.DELETE_DRUG_URL,JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    getDrugDb(){
        return this._http.get(this.GET_DRUG_TABLES_URL,this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    getDrugForPagination(id:number){
        return this._http.get(this.DRUG_FOR_PAGINATION_URL+"/"+id,this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
}