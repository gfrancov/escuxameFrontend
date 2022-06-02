import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection, getDocs } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


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


  constructor(private authService: AuthService, private userService: UsersService) { }

  ngOnInit(): void {
    this.authService.checkLoggedOut();
  }

  registrar() {
    const { email, password, username } = this.userRegister;
    this.userService.ifExists(username).then((result) => {
      if(result < 1) {
        this.authService.register(email,password,username).then(function (result) {
          console.log(result);
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Vaya!',
          text: '¡Ese nombre de usuario ya está en uso!',
          showConfirmButton: true,
          confirmButtonColor: '#f27474',
          confirmButtonText: 'Volver',
          background: '#181818',
          color: '#fff',
          timer: 5000
        });
      }

    });

  }

}