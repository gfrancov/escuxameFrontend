import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister = {
    email: '',
    username: '',
    password: ''
  }

  userExist : any;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    const { email, password, username } = this.userRegister;

    this.authService.register(email,password,username).then(function (result) {
      
      console.log(result);

    });



  }

}