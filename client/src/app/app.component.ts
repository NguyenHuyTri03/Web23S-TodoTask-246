import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private auth: Auth, private authService: AuthService,private router:Router){}

  ngOnInit() :void{
    onAuthStateChanged(this.auth, (user) => {
      if(user) {
        this.authService.currentUser = user;
        this.router.navigate(['/hometask'])
        console.log(user)
      }else{
        console.log("No user");
        this.authService.currentUser = null;
      }
    })
  }

  callback(){

  }
}
