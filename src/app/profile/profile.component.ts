import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection, getDocs, orderBy, limit } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedUser : string = '';
  userExists : boolean = false;
  userData : any;
  userPosts : any = [];

  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
   
    this.selectedUser = this.route.snapshot.params['user'];

     this.getUser(this.selectedUser).then((result:any) => {

      if(result.docs.length == 1) {
        this.userExists = true;
      }

      result.forEach((doc: any) => {
        this.userData = doc._document.data.value.mapValue.fields;
      });

    });

    this.getUserPosts(this.selectedUser).then( (result:any) => {
      
      result.forEach((doc: any) => {
        const docResult = doc._document.data.value.mapValue.fields;
        this.userPosts.push(docResult);
      });

    });

    console.log(this.userPosts);
    

  }

  async getUser(username : string) {

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('name', '==', username), limit(1));

    const querySnapshot = await getDocs(q);
    return querySnapshot;

  }

  async getUserPosts(username : string) {

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const q = query(collection(db, 'posts'), where('username', '==', username));

    const querySnapshot = await getDocs(q);
    return querySnapshot;

  }

  goToSpotify(url : string) {
    window.open(url, "popup",'width=800,height=500,');
  }

}
