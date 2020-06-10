import { Injectable, NestMiddleware } from "@nestjs/common";

import * as jwt from 'jsonwebtoken';


@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: () => void) {
        
        const authJwtToken = req.headers['authorization'];

        if (!authJwtToken) {
            next();
            return;
        }

        try {
            const user = jwt.verify(authJwtToken, process.env.JWT_KEY);

            if (user) {
                console.log("Found user details in JWT: ", user);
                req['currentUser'] = user;
            }
        }
        catch (err) {
            console.log('Error handling authentication JWT: ', err);
        }
        next();
    }
}
