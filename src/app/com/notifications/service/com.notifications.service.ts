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
export class NotificationsService extends BaseService{

    private ADD_NOTIFICATION_URL = this._APIURL + '/notification/addUpdateNotifications';
    private SEARCH_NOTIFICATIONS_URL = this._APIURL + '/notification/searchNotifications';
    private GET_DATA_URL = this._APIURL + '/dataSync/getData';
    private VIEW_NOTIFICATION_URL = this._APIURL + '/notification/getNotification';
    private GET_LATEST_NOTIFICATION_URL = this._APIURL + '/notification/getLatestNotifications';
    private GET_NOTIFICATION_CONTENT = this._APIURL + '/notification/getNotificationContent';
    private DELETE_NOTIFICATION_URL = this._APIURL + '/notification/deleteNotifications';
    private DELETE_IMAGE_URL = this._APIURL + '/notification/deleteNotificationImage';
    private GET_DATA_NOTIFICATION_URL = this._APIURL + '/notification/getDataNotification';
    constructor(injector:Injector){
        super(injector);
    }

    addNotifications(request: any) : Promise<any>{
        return this._http.post(this.ADD_NOTIFICATION_URL , JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res =>(res.json()));
    }

    getData(request: any) : Promise<any>{
        return this._http.post(this.GET_DATA_URL , JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }

    searchNotifications(request: any) : Promise<any>{
        return this._http.post(this.SEARCH_NOTIFICATIONS_URL , JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }

    viewNotification(id: number): Promise<any> {

        return this._http.get(this.VIEW_NOTIFICATION_URL+"/"+id ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    notificationContent(id: number) : Promise<any> {
        return this._http.get(this.GET_NOTIFICATION_CONTENT+"/"+id,this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.text());
    }
    getLatestNotifications(request: any) : Promise<any>{
        return this._http.post(this.GET_LATEST_NOTIFICATION_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    deleteNotifications(request: any) : Promise<any> {
        return this._http.post(this.DELETE_NOTIFICATION_URL,JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json());
    }
    deleteImageUrl(id: number): Promise<any> {
        return this._http.get(this.DELETE_IMAGE_URL+"/"+id, this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    } 
    getDataNotifications(request: any) : Promise<any> {
        return this._http.post(this.GET_DATA_NOTIFICATION_URL, JSON.stringify(request),this._httpHeaderOptions )
        .toPromise()
        .then(res => res.json());
    }
}