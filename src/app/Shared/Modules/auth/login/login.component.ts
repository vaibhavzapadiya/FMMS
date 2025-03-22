import { Component } from '@angular/core';
import { NavbarComponent } from "../../../Components/navbar/navbar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hasError: boolean = false
  loginform!: FormGroup
  errorMessage: any;

  constructor(private router: Router, private fb: FormBuilder, private authservice: AuthService) {
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required]
    })

  }

  onLogin() {
    if (this.loginform.valid) {
      this.hasError = false;

      this.authservice.login(this.loginform.value).subscribe({
        next: (data) => {
          console.log("Login Successful:", data);

          sessionStorage.setItem("authToken", data.token);

          this.router.navigate(['/fmms'])
        },
        error: (error) => {
         
          this.hasError = true;

          // Extract and display error message
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = "An unexpected error occurred. Please try again.";
          }
        }
      });

    } else {
      this.hasError = true;
      this.errorMessage = "Please fill in all required fields.";
    }

  }
}
