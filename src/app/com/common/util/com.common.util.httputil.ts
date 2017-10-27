
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

export class HttpUtil {

  static getHeaderOptions(){
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        return options;
   }
}