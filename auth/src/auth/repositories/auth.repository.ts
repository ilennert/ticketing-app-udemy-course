import { Injectable, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Observable, of } from "rxjs";

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from 'jsonwebtoken';

import { UserDoc } from '../../models/user';
import { PasswordService } from "../services/password.service";

@Injectable()
export class AuthRepository {

    constructor(@InjectModel('User') private authModel: Model<UserDoc>,
                private passwordService: PasswordService) {}

    public currentUser(user: any): Observable<any> {
        return of({ currentUser: user });
    }

    async signIn(createUser: { email: string, password: string }): Promise<string> {
        const { email } = createUser;
        const existingUser = await this.authModel.findOne({ email });

        if (!existingUser) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!await this.passwordService.compare(existingUser.password, createUser.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        return jwt.sign({
                id: existingUser._id,
                email: existingUser.email,
            }, this.getJWT_KEY());
    }

    async signUp(createUser: { email: string, password: string }): Promise<string> {
        const { email } = createUser;
        const existingUser = await this.authModel.findOne({ email });

        if (existingUser) {
            throw new ForbiddenException('Unavailable user');
        }
        
        createUser = { ...createUser, password: await this.passwordService.toHash(createUser.password) }
        const user = new this.authModel(createUser);
        await user.save();

        // generate the JWT
        const userJwt = jwt.sign({
            id: user._id,
            email: user.email
        }, this.getJWT_KEY());

        return userJwt;
    }

    public signOut(user: any): Observable<any> {
        return of({ currentUser: null });
    }

    private getJWT_KEY(): string {
        return process.env.JWT_KEY as string;
    }
}