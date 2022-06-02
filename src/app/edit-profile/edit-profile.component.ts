import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {debounceTime, finalize, map, switchMap, tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, getDoc, doc, query, where, getFirestore, collection, getDocs, updateDoc, UpdateData, limit } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { ActivatedRoute } from '@angular/router';
import { update } from 'firebase/database';
import * as firebase from 'firebase/compat';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userName : any;
  userData : any =  {
    biography: '',
    name: 'Anónimo',
    userId: '',
    pfp: '../assets/pfp/default-avatar.png',
    id: ''
  }

  constructor(private firebaseAuth: AngularFireAuth, private firestore : Firestore) { 
    
   }

  ngOnInit(): void {
    this.firebaseAuth.authState.subscribe( authState => {
      this.userName = authState?.displayName;
      this.getUser(authState?.displayName).then((result:any) => {

        result.forEach((doc: any) => {
          const currentUserData = doc._document.data.value.mapValue.fields;
         
          this.userData.biography = currentUserData.biography.stringValue;
          this.userData.name = currentUserData.name.stringValue;
          this.userData.id = currentUserData.id.stringValue;
          this.userData.pfp = currentUserData.pfp.stringValue;
          this.userData.id = doc.id;

        });

      });

    });

  }

  async getUser(username : any) {

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('name', '==', username), limit(1));

    const querySnapshot = await getDocs(q);
    return querySnapshot;

  }

  async doChanges() {
    
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const userId = doc(db, 'users', this.userData.id);

    await updateDoc(userId, {
      biography: this.userData.biography,
      pfp: this.userData.pfp
    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualizado!',
      text: 'Tu perfil ha sido actualizado',
      showConfirmButton: true,
      confirmButtonColor: '#7ea966',
      confirmButtonText: 'Visualizar',
      color: '#fff',
      background: '#181818',
    }).then(() => {
      window.location.href = `/u/${this.userData.name}`;
    });

  }

}
