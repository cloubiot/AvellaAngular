import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

constructor(
private _sessionStorageService : SessionStorageService){
      
    }

  canActivate() {
    var role = this._sessionStorageService.getObject("roleId");
     console.log(role);
    if(role == 1)
    return true;
    else
    return false;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}