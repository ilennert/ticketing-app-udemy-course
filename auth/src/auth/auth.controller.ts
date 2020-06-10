import { REQUEST } from '@nestjs/core';
import { Body, Controller, Get, Post, UseGuards, Inject } from '@nestjs/common';
import { Observable, of } from 'rxjs';

// import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
// import { Credentials } from 'src/models/credentials.model';
import { CreateUserDto } from '../models/user-dto.model';
import { AuthenticationGuard } from './guards/authentication.guard';

@Controller('users')
export class AuthController {
    constructor(private readonly authRepo: AuthRepository,
                @Inject(REQUEST) private request) {}

    @Post('signup')
    async signUp(@Body() credentials: CreateUserDto): Promise<any> {
        return this.authRepo.signUp(credentials);
    }

    @Post('signin')
    signIn(@Body() credentials: CreateUserDto): Promise<any> {
        return this.authRepo.signIn(credentials);
    }

    @Post('signout')
    @UseGuards(AuthenticationGuard)
    signOut(): Promise<any> {
        return this.authRepo.signOut(this.request['currentUser']).toPromise();
    }

    @Get('currentuser')
    @UseGuards(AuthenticationGuard)
    async currentUser(): Promise<string> {
        return this.authRepo.currentUser(this.request['currentUser']).toPromise();
    }
}
