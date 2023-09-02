import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private authService:AuthService,private alertify: AlertifyService,
    private router:Router){}
  onLogin(loginForm:NgForm){
    const token=this.authService.authUser(loginForm.value);
    //console.log("onlogin",user)
    
    if(token){
      localStorage.setItem('token',token.userName)

     // console.log("success",user)
      this.alertify.success('login successfull')
      this.router.navigate(['/'])
    }
    else{
      this.alertify.error('login not successful')
      //console.log(token)
    }
   
  }

}
