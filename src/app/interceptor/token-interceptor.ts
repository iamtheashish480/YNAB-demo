import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  "providedIn": "root"
})

export class TokenInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser={authdata:"test"};
    if (currentUser) {
        request = this.addtoken(request,  `${currentUser.authdata}`);
        return next.handle(request);
    } else {
        return next.handle(request);

    }
}

private addtoken(request: HttpRequest<any>, token: any) {

    return request.clone({
        setHeaders: { 'Authorization': token }
    });
}
}