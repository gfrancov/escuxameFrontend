import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  entrar() {

    console.log(this.userLogin);
    const { email, password } = this.userLogin;
    this.authService.login(email,password).then(res => {
      console.log(res); 
    })


  }

}
