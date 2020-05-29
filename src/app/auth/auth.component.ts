import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authObservable: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.error("Form is invalid. Can't submit.");
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      this.authObservable = this.authService.login(email, password);
    } else {
      this.authObservable = this.authService.signup(email, password);
    }

    this.authObservable.subscribe(
      (responseData) => {
        // console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        // console.error(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onErrorClosed() {
    this.error = null;
  }
}
