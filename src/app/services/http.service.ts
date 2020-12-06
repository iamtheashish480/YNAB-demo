import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from 'rxjs/operators';
import { throwError, of } from "rxjs";
import { Injectable } from '@angular/core';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: "root"
})

export class HttpService {
    constructor(private http: HttpClient) {
    }

    createGetRequest(url: string) {
        return this.http.get<any>(url+"?access_token=c2ba2f1b621891e0baf5cce7a7f65c909dfe0554dafda94e4ac39a689a4f4249")
            .pipe(
                catchError(this.handleError));
    }

    createPostRequest(url: any, data: any) {
        return this.http.post<any>(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
     console.log(error);
        if (error.error instanceof HttpErrorResponse) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // if(error['status']==400 ||error['status']==500 ){
            return of(error.error);
            // }
            console.log(error);
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error);
    }
}