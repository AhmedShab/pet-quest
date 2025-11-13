import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const auth = inject(AuthService);
  const token = auth.token;

  if (!token) {
    return next(req);
  }

  const authed = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authed);
};
