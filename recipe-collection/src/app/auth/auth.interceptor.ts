import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user: User | null) =>  {
          if (!user) {
            return next.handle(request);
          }

          // @ts-ignore
          const modifiedReq = request.clone({ params: new HttpParams().set('auth', user.token) });
          return next.handle(modifiedReq);
        })
      );
  }
}
