import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userId: number = 0 ; // Define the userId property
  role: string ="Buyer"; // Define the role property
  user: any; // Define the user property

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Fetch the user ID from local storage
    this.userId = this.getUserIdFromLocalStorage();
    this.fetchUserData();
  }

  getUserIdFromLocalStorage(): number {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 1; // Default to 1 if not found
  }

  fetchUserData() {
    this.userService.getUserById(this.userId).subscribe(response => {
      this.user = response;
      this.role = response.role;
    }, error => {
      console.error('Error fetching user data', error);
    });
  }

  switchRole() {
    this.role = this.role === 'BUYER' ? 'SELLER' : 'BUYER';
    this.userService.switchRole(this.userId, this.role).subscribe(response => {
      console.log('Role switched successfully', response);
      this.user.role = this.role; // Update the role in the user object
    });
  }
}
