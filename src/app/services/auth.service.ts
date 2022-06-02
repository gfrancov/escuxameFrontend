import { Injectable, NgZone } from '@angular/core';
import { user, getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth : AngularFireAuth, private usersService : UsersService, private ngZone: NgZone, private router: Router) { }

  async login(email:string,password:string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email,password);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  getUserData() : any{

    const auth = getAuth();
    const usuario = auth.currentUser;
    if(usuario !== null) {
      return {
        displayName: usuario.displayName,
        uid: usuario.uid
      }
    }

  }

  checkLoggedIn() {

    this.afauth.user.subscribe(user => {
      if(!user) {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        })
      }
    })
  }

  checkLoggedOut() {

    this.afauth.user.subscribe(user => {
      if(user) {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        })
      }
    })
  }

  async register(email:string,password:string,username:string) {

    try {
      return await this.afauth.createUserWithEmailAndPassword(email,password).then( async (result) => {

        const response = await this.usersService.addUser({
          id: result.user?.uid,
          name: username,
          biography: '',
          pfp: 'default.png',
        });

        console.log(response);
        
        result.user?.updateProfile({
          displayName: username
        });
      }).catch(function(error){
        console.log(error);
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async loginGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async logout() {
    await this.afauth.signOut();
  }


}
