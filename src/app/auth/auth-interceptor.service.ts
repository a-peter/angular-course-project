import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // first method to check if interceptor is needed
    if (request.url.includes('identitytoolkit')) {
      console.log('interceptor not needed');
      return next.handle(request);
    }
    console.log('request', request);
    console.log('next', next);
    
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // second method to check if interceptor is needed
        if (!user) {
          return next.handle(request);
        }

        console.log('adding auth param');
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
