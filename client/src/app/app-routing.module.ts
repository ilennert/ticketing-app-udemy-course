import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent, canActivate: [ AuthGuard ] },
  { path: 'signin', component: SigninFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'signout', component: SignoutComponent },
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
