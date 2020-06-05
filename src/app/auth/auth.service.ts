import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  public user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3b4bQDdifHMS9TnW0Al7raPgaDWBj5EM',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyB3b4bQDdifHMS9TnW0Al7raPgaDWBj5EM ',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    this.clearLoginDataFromStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogin() {
    if (localStorage.userData) {
      console.log('Restore user data');

      let u = JSON.parse(localStorage.userData);
      const loadedUser = new User(
        u.email,
        u.id,
        u._token,
        new Date(u._tokenExpirationDate)
      );
      if (loadedUser.token) {
        const expirationDuration =
          new Date(u._tokenExpirationDate).getTime() - new Date().getTime();
        if (expirationDuration >= 0) {
          this.user.next(loadedUser);
          this.autoLogout(expirationDuration);
        } else {
          console.warn('login expired');
        }
      } else {
        console.log('No token for user');
      }
    }
  }

  autoLogout(expirationDuration: number) {
    console.log('Logging out in ms:', expirationDuration);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  clearLoginDataFromStorage() {
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    console.log('user authenticated', email, token.slice(0, 40), '...');

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.error('----------------------', errorResponse, '----------------------');
    
    let errorMessage = 'An unknown error occurred. ';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This E-Mail is already registered.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many sign-in requests. Try later again.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-Mail is not registered.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong E-Mail or wrong password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled. Please contact us.';
        break;
      default:
        errorMessage = errorMessage + errorResponse.error.error.message;
    }
    return throwError(errorMessage);
  }
}
