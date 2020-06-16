import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CreateUser } from '../models/user-info';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ] ]
    });
    console.log(this.signupForm);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.value)
        .subscribe((result) => {
          const jwt = result.result;
          localStorage.setItem('authJwtToken', jwt);
          this.router.navigateByUrl('/home');
        });
  }
}
