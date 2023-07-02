import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppRoutes } from 'src/constants';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  AppRoutes = AppRoutes;
  successMessage = "";
  errorMessages: string[] = [];
  loginForm!: FormGroup;


  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.successMessage = this.messageService.message;
    this.messageService.message = '';

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

  }



  onSubmit() {
    this.errorMessages = [];
    if (this.loginForm?.valid) {
      const { username, password } = this.loginForm.value;


      this.authService.login(username, password)
        .subscribe({
          next: (data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(["/"]);
          },
            error: (e) => {
            console.error(e);
            if (e.status === 400 && e.error) {
              // Server returned a validation error
              if (e.error == "Bad credentials"){
                this.errorMessages.push("Invalid Username or Password")
              }
              else{
                this.errorMessages.push(e.error)
              }
            } else if (e.status === 500) {
              // Server error
              let a = [];

              this.errorMessages.push('An error occurred on the server. Please try again later.');
            } else {
              // Network error or other error
              this.errorMessages.push('An error occurred. Please try again later.');
              console.error(e);

              // ToDo: handle errors
            }
          }
        });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
