import { Component } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'my-menu',
  templateUrl: 'com.common.menu.html'
})
export class Menu extends FormComponent{
     roleId:number;
      constructor(injector:Injector) {
           super(injector);
           this.roleId = this._sessionStorageService.getObject("roleId");
    //       alert(userProfile)
           
    //       this._loggingService.logDebug(this.getName(), "User RoleId"+this.roleId);
      }

 }
