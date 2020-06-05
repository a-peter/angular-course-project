import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private errorSub: Subscription = null;
  // @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective; 

  authObservable: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

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
        this.showErrorAlert(this.error);
      }
    );

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onErrorClosed() {
    console.log('onErrorClosed', this);
    this.alertHost.viewContainerRef.clear();
    // this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.resolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // const c: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(alertComponentFactory);
    const c = hostViewContainerRef.createComponent(alertComponentFactory);
    c.instance.message = message;
    this.errorSub = c.instance.close.subscribe(() => {
      this.alertHost.viewContainerRef.clear();
      this.errorSub.unsubscribe();
      this.errorSub = null;
    });
    // alertComponentFactory.create();
  }
}
