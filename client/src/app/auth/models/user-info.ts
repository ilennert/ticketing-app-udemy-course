import { EmailValidator } from '@angular/forms'

export interface UserInfo {
    id: string;
    email: string;
    role: string[];
    jwt: string;
}

export interface CreateUser {
    email: string;
    password: string;
}
