import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    role: 'BUYER'
  };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.registerUser(this.user).subscribe(response => {
      console.log('User registered successfully', response);
      localStorage.setItem('userId', response.id.toString());
      // Redirect to the profile page after successful login
      this.router.navigate(['/profile']);
    });
  }
}
