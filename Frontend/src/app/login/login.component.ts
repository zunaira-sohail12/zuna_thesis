import { Component } from '@angular/core';
import { PythonApisService } from '../python-apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginUserResp:any;
  saveUserResp:any;
  constructor(public apiService:PythonApisService,private route: Router){}

loginUser(username:any,password:any)
{
  this.chatbot();
/*  this.apiService.userLogin(username,password).subscribe(data =>
    {
      console.log(JSON.parse(JSON.stringify(data)).status);
      this.loginUserResp=JSON.parse(JSON.stringify(data)).status;
      if(this.loginUserResp=='success')
      {this.chatbot()}
      else
      {
        this.loginUserResp=='failed to login';
      }
      
  },err=>{
    console.log(err);
    this.loginUserResp=err;
  });  */
}

saveUser(email:any,username:any,pass:any,cpass:any)
{
  
this.saveUserResp="SUCCESS";
 /* this.apiService.saveUser(email,username,pass,cpass).subscribe(data =>
    {
      this.apiService.sendMail(email,'Invitation user','This is test body').subscribe(data =>
      {this.saveUserResp=JSON.parse(JSON.stringify(data)).status;},err=>{this.saveUserResp=err;});
      this.saveUserResp=JSON.parse(JSON.stringify(data)).status;
  },err=>{
    this.saveUserResp=err;
  });  */

}

chatbot()
{
  this.route.navigate(['/3D-step-system']);
}
}
//this code is written by Zunaira