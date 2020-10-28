import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MainService } from '../../main.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public mainService: MainService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    this.mainService.hideSpinner();
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                        this.mainService.errorToast(errorMessage)
                    } else {
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        this.mainService.errorToast(errorMessage)
                    }
                    this.mainService.errorToast(errorMessage)
                    return throwError(errorMessage);
                })
            )
    }
}
