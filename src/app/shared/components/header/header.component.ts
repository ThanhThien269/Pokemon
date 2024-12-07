import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  private authenticationSub!: Subscription;
  userAuthenticated = false;

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authenticationSub = this.authService
      .getAuthenticatedSub()
      .subscribe((status) => {
        this.userAuthenticated = status;
      });
  }

  goToLogin() {
    // Điều hướng đến trang đăng nhập
    this.router.navigate(['/login']);
  }
}
