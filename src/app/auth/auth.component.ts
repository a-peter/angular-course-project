import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.error("Form is invalid. Can't submit.");
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      console.error('To be implemented');
      this.isLoading = false;
    } else {
      this.authService.signup(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
        },
        (errorMessage) => {
          console.error(errorMessage);
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
