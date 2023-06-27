import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(["/"]);
        },
        error: (e) => console.error(e),
        complete: () => console.info('jwt toke acquired') 
    });
    
  }}
