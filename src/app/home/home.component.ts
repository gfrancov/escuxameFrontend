import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection, getDocs, orderBy, limit } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { 

  }

  todayPosts : any = [];

  async ngOnInit(): Promise<void> {

    this.getAllPosts24().then( (result:any) => {
      
      result.forEach((doc: any) => {
        const docResult = doc._document.data.value.mapValue.fields;
        this.todayPosts.push(docResult);
      });

    });

    console.log(this.todayPosts);
    
  }

  async getAllPosts24() {

    var result;

    // Last 24 hours
    const datetime = new Date();
    datetime.setHours(datetime.getHours() - 24);

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const q = query(collection(db, 'posts'), where('publishDate', '>=', datetime), orderBy('publishDate', 'desc'), limit(20));

    const querySnapshot = await getDocs(q);
    return querySnapshot;

  }

  goToSpotify(url : string) {
    window.open(url, "popup",'width=800,height=500,');
  }

}
