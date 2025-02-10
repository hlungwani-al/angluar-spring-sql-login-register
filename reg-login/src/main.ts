import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { UserService } from './app/user.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  
    provideRouter(routes),
    UserService 
  ]
}).catch(err => console.error(err));
