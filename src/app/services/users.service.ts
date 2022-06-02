import { Injectable } from '@angular/core';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { getDocs } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
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

  async ifExists(username: string) {

    var count = 0;

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('name', '==', username));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      count++;
    });
    
    return count;

  }

}