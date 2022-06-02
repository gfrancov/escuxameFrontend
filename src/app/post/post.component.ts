import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {debounceTime, finalize, map, switchMap, tap} from 'rxjs/operators';
import { SpotifyService } from '../services/spotify.service';
import { AuthService } from '../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public isLoading = false;
  public src: string | undefined;
  public data$ : any;

  public trackData : any = {
    uri: '',
    image: '../assets/logos/empty-track.png',
    title: 'Canción',
    artist: 'Artista',
    link: '#'
  }

  public postContent : any = "Menudo temarraken manito";

  constructor(private spotifyApi : SpotifyService, private authService: AuthService, private firestore : Firestore) { }

  ngOnInit(): void {
  }

  search(value: any) : any {

    this.isLoading = true;

    this.data$ = this.spotifyApi.searchSong({q: value})
      .pipe(
        map(({tracks}) => tracks.items),
        finalize(() => this.isLoading = false)
      )

  }

  selectSong(item : any) {
    
    console.log(item);

    this.trackData.uri = item.uri;
    this.trackData.title = item.name;
    this.trackData.image = item.album.images[0].url;
    this.trackData.artist = item.artists[0].name;
    this.trackData.link = item.external_urls.spotify;

    this.search('');

  }

  publish() : any {

    if(this.trackData.uri === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Oye!',
        text: 'Has de seleccionar una canción para publicar algo.',
        showConfirmButton: true,
        confirmButtonColor: '#f27474',
        confirmButtonText: 'Volver',
        background: '#181818',
        color: '#fff',
        timer: 5000
      });
    } else {

      const publishDate = (new Date());
      const userData = this.authService.getUserData();

      const postInfo = {

        userId: userData.uid,
        username: userData.displayName,
        track: this.trackData,
        publishDate: publishDate,
        content: this.postContent

      }

      const posts = collection(this.firestore, 'posts');
      addDoc(posts, postInfo);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Publicado!',
        text: 'Tu post ha sido publicado correctament',
        showConfirmButton: true,
        confirmButtonColor: '#7ea966',
        confirmButtonText: 'Visualizar'
      }).then(function() {
        window.location.href = "/home";
      });

    }

  }

}
