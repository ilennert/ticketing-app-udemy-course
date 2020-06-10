import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class AuthenticationGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        
        const host = context.switchToHttp(),
              request = host.getRequest();

        const user = request['currentUser'];

        if (!user) {
            console.log("User not authenticated, denying access.");
            throw new UnauthorizedException();
        }

        console.log('User is authenticated, allowing access');

        return true;
    }
}
