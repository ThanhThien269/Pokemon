import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginStart } from '../../ngrx/auth/auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup; // Khai báo form group

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Khởi tạo form group với các control
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      this.router.navigate(['']);
      // Call backend API for login with formData (email, password)
    } else {
      console.log('Form is invalid');
    }
  }
}
