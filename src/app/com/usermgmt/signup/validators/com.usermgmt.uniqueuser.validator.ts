import  {FormControl}  from '@angular/forms'; 
import { UserValidationService } from '../../service/com.service.uservalidation'
import {UserMgmtService} from '../../service/com.service.usermgmt'
import {ReflectiveInjector} from '@angular/core';
import {LoggingService} from '../../../common/service/logging/com.common.service.logging';
import {ConfigService} from '../../../common/service/config/com.common.service.config.configmanager';
import { Http } from '@angular/http';

export class UniqueUsernameValidators {

static userNotExists(userMgmtService:UserMgmtService){
    return (control: FormControl) => { 
        let promise = userMgmtService.checkUserExists(control.value);
        let isUserExists=false;
        promise.then((res)=>{
            if(res.userNameExists)
              isUserExists=true;
        });
        return new Promise((resolve, reject) => {
            setTimeout(function(){
            if (isUserExists){
                resolve({ userNotExists: false });
            }
            else{
                 resolve({ userNotExists: true });
             // resolve(null);
            }
            },500);
        });

    }
}
 static shouldBeUnique(userMgmtService:UserMgmtService){   
    return (control: FormControl) => { 
        let promise = userMgmtService.checkUserExists(control.value);
        let isUserExists=false;
        promise.then((res)=>{
            if(res.userNameExists)
              isUserExists=true;
        });
        return new Promise((resolve, reject) => {
            setTimeout(function(){
            if (isUserExists){
                resolve({ shouldBeUnique: true });
            }
            else
            resolve(null);
            },500);
        });

    }
 } 
static shouldBeNumber(){

 return (control: FormControl) =>  {
        // check if string has a dot
        let hasDot:boolean = control.value >= 0 ? true : false;
        // convert string to number
        let number:number = Math.floor(control.value);
        // get result of isInteger()
        let integer:boolean = Number.isInteger(number);
        // validate conditions 
        let valid:boolean = !hasDot && integer && number>0;
        console.log('isInteger > valid', hasDot, number, valid);
        if (!valid) {
            return { isInteger: true };
        }
        return null;
    }
}       
/* static shouldBeUnique(userMgmtService:UserMgmtService){   
    return (control: FormControl) => { 
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                if (userMgmtService.checkUserExists(control.value)){
                    resolve({ shouldBeUnique: true });
                }
                else
                resolve(null);
            },1000);
            });
    }
 } */
}