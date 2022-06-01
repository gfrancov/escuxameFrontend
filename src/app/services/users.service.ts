import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, query } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore : Firestore) { }

  addUser(user: User) {

    const userId = collection(this.firestore, 'users');
    return addDoc(userId, user);

  }

  ifExists(user: User) {

    //const q = query(collection(this.firestore, 'users'), where())
    
  }

}