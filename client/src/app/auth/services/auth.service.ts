import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { CreateUser } from '../models/user-info';
import { DOMAIN_NAME } from '../../constants';

@Injectable({ providedIn: "root" })
export class AuthService {
    private baseUrl = DOMAIN_NAME;

    constructor(private http: HttpClient) {}

    signUp(user: CreateUser): Observable<{result: string}> {
        const signupUrl = `${this.baseUrl}/api/users/signup`;
        return this.http
            .post<any>(signupUrl, user)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }

    signIn(user: CreateUser): Observable<{result: string}> {
        const signinUrl = `${this.baseUrl}/api/users/signin`;
        return this.http
            .post<any>(signinUrl, user)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }

    signOut(): Observable<{ currentUser: any | null }> {
        const signoutUrl = `${this.baseUrl}/api/users/signout`;
        return this.http
            .post<{ currentUser: any | null }>(signoutUrl, null)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }
}
