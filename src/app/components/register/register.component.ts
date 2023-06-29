import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from 'src/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessages: string[] = [];
  registerForm!: FormGroup;
  AppRoutes = AppRoutes;
  
  constructor(private authService : AuthService, private router : Router, private formBuilder : FormBuilder){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit() {
    this.errorMessages = [];
    if (this.registerForm?.valid) {
      const { username, email, password } = this.registerForm.value;
      

      this.authService.register(username, email, password)
        .subscribe({
          next: (data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(["/login"]);
          },
          error: (e) => {
            console.error(e);
            if (e.status === 400 && e.error) {
              // Server returned a validation error
              for(let err of e.error){
                this.errorMessages.push(err.description)
              }
            } else if (e.status === 500) {
              // Server error
              let a = [];
              
              this.errorMessages.push('An error occurred on the server. Please try again later.');
            } else {
              // Network error or other error
              this.errorMessages.push('An error occurred. Please try again later.');          console.error(e);

              // ToDo: handle errors
            }
        }
      });
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
