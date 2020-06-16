import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupFormComponent } from './signup-form/signup-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignoutComponent } from './signout/signout.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ 
    SignupFormComponent,
    SigninFormComponent,
    SignoutComponent
  ],
  exports: [
    SignupFormComponent,
    SigninFormComponent,
    SignoutComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule { }
