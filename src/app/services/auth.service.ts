import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private loginUrl = "Users/BearerToken"


  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.loginUrl}`,
      {
        "userName": userName,
        "password": password
      })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout(){
    localStorage.removeItem('token');
  }
  
}
