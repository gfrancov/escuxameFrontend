import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin : any = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {    
    this.authService.checkLoggedOut();
  }

  entrar() {

    const { email, password } = this.userLogin;
    this.authService.login(email,password).then(res => {
      this.router.navigate(['/home']);
    })

  }

  google() {

    this.authService.loginGoogle().then(res => {
      console.log(res); 
    })

  }

}
