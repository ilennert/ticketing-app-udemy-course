import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    // just leaving this around.. Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    this.signinForm = this.formbuilder.group({
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ] ]
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    this.authService.signIn(this.signinForm.value)
        .subscribe((result) => {
          const jwt = result.result;
          localStorage.setItem('authJwtToken', jwt);
          this.router.navigateByUrl('/home');
        });
  }
}
