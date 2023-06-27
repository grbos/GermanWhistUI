import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor  {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from local storage
    let token = localStorage.getItem('token');

    if (token) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Send the cloned request to the next handler.
    return next.handle(request);
  }
}
