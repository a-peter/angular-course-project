import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3b4bQDdifHMS9TnW0Al7raPgaDWBj5EM',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(
      errorResponse => {
        let errorMessage = 'An unknown error occurred. ';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        };
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
          default:
            errorMessage = errorMessage + errorResponse.error.error.message;
            break;
        }
        return throwError(errorMessage);
      }
    ));
  }
}
