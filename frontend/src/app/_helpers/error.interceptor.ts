import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 403) {
                if (request.url.includes('/account-info')) {
                    if (err.error.message.includes('invalid token')) {
                        const oldErrorMessage = err.error.message;
                        err.error.message = oldErrorMessage + '. Please create new account request';
                    }
                }
            }

            if (err.status === 401) {
                if (err.error.message.includes('Invalid User Token')) {
                    const oldErrorMessage = err.error.message;
                    err.error.message = oldErrorMessage + '. Please login again';
                    this.authenticationService.logout();
                    location.reload(true);
                }
            }

            const error = err.message + '. Message: ' + err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}