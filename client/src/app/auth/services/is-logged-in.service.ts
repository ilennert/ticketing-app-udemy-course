import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggedInService {
    
    isLoggedIn(): boolean {
        const jwt = localStorage.getItem("authJwtToken");
        if (jwt) {
            return true;
        }
        return false;
    }
}