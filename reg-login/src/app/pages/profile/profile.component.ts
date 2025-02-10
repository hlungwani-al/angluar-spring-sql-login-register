import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userId: number=0; // Define the userId property
  role: string=''; // Define the role property
  user: any; // Define the user property
  runnerApplications: any[] = []; // Define the runnerApplications property
  applicationMessage: string = ''; // Define the applicationMessage property

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Fetch the user ID from local storage
    this.userId = this.getUserIdFromLocalStorage();
    this.fetchUserData();
    this.fetchRunnerApplications();
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
      this.fetchRunnerApplications(); // Fetch applications after setting the role
    }, error => {
      console.error('Error fetching user data', error);
    });
  }

  fetchRunnerApplications() {
    console.log("Fetching applications for role:", this.role);
    
    if (this.role === 'BUYER') {
      this.userService.getRunnerApplications().subscribe(response => {
        console.log("Runner Applications Received:", response);
        this.runnerApplications = response;
      }, error => {
        console.error('Error fetching runner applications', error);
      });
    } else {
      console.log("Not fetching applications as role is:", this.role);
    }
  }
  

  switchRole() {
    this.role = this.role === 'BUYER' ? 'SELLER' : 'BUYER';
    this.userService.switchRole(this.userId, this.role).subscribe(response => {
      console.log('Role switched successfully', response);
      this.user.role = this.role; // Update the role in the user object
      this.fetchRunnerApplications(); // Refresh the list of runner applications
    });
  }

  signOut() {
    // Clear user data from local storage
    localStorage.removeItem('userId');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  applyToBeRunner() {
    this.userService.applyToBeRunner(this.userId).subscribe(response => {
      this.applicationMessage = response;
    }, error => {
      console.error('Error applying to be a runner', error);
    });
  }
}