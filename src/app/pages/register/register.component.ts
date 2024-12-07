import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { registerStart } from '../../ngrx/auth/auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid');
    }
  }
}
