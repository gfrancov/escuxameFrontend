import { Injectable, NgZone } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';


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

  public checkLogged() {
    this.afauth.user.subscribe(user => {
      if(user) {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
          console.log(user);
        })
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
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
