import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AppErrorHandel implements ErrorHandler {
    constructor( ) {}
    // if you want  inject any service you have to inject in manually   , not dynamic  >> AppInjector
    handleError(error:any) {
        // your custom error handling logic

        if (error instanceof URIError) {
            error.message = 'Failed to decode param \'' + "xcxcxccxcxcvxcxcxcx" + '\'';
            console.error(error.message);
        }
      //  console.error(error.message);
    }
}
