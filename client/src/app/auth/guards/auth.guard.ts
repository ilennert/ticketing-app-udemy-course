import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const jwt = localStorage.getItem("authJwtToken");
        if (jwt) {
            return true;
        }
        this.router.navigateByUrl('/signin');
        return false;
    }
}
