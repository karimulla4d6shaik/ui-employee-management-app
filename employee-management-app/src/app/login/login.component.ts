import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSuccess } from '../models/login-success.model';
import { Login } from '../models/login.model';
import { AppStorage } from '../models/storage.model';
import { LoginService } from '../services/login.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();
  error: string='';
  loginFlag:boolean=false;
  private storage = new AppStorage();

  constructor(private loginService : LoginService, private shareService : ShareService,
    private router : Router) { }

  ngOnInit(): void {
    this.shareInfo(this.loginFlag);
  }

  loginFunction(): any{
    if(this.login.userName == '' || this.login.password === ''){
      this.error = "Username and Password sholud not be empty...";
      return false;
    }
    if(this.error !== ''){
      this.error='';
    }
    this.loginService.login(this.login).subscribe(response => {
      if(response.status === 'SUCCESS'){
        let loginSuccess = new LoginSuccess();
        loginSuccess.userName = response.userName;
        loginSuccess.token = response.token;
        this.storage.setLocalStorage(loginSuccess);
        this.loginFlag = true;        
        this.router.navigate(['/home']);         
      }else{
        this.error = response.status;
        this.storage.consoleStorage(response);
      }
    }, error => {
      if(error.error.message === 'Bad credentials'){
        this.error = 'Incorrect Username or Password, Please try correct one';
      }
      this.storage.consoleStorage(error.error);
    });
  }

  shareInfo(data:any){
    this.shareService.setInformation(data);      
  }
}
