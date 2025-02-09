import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.loginUser(this.user).subscribe(response => {
      console.log('Login successful', response);
      // Store the user ID in local storage
      localStorage.setItem('userId', response.id.toString());
      // Redirect to the profile page after successful login
      this.router.navigate(['/profile']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
