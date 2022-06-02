import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection, getDocs, deleteDoc, limit } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  ownProfile : boolean = false;

  constructor(private route: ActivatedRoute, private firebaseAuth: AngularFireAuth) { }

  async ngOnInit(): Promise<void> {
   
    this.selectedUser = this.route.snapshot.params['user'];

    this.firebaseAuth.authState.subscribe( authState => {
      
        if(this.selectedUser == authState?.displayName) {
          this.ownProfile = true;
        }
      });

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
        docResult.id = doc.id;
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

  async deletePost(postId : string) {
    
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const postCon = doc(db, 'posts', postId);
    await deleteDoc(postCon);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Post borrado!',
      text: 'El post seleccionado ha sido borrado!',
      showConfirmButton: true,
      confirmButtonColor: '#7ea966',
      confirmButtonText: 'Ver mis posts',
      color: '#fff',
      background: '#181818',
    }).then(() => {
      window.location.href = `/u/${this.selectedUser}`;
    });

  }

}
