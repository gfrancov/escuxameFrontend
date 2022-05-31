import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister = {
    email: '',
    password: ''
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    console.log(this.userRegister);
    const { email, password } = this.userRegister;
    this.authService.register(email,password).then(res => {
      console.log(res); 
    })

  }

}
