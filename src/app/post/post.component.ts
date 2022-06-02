import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {debounceTime, finalize, map, switchMap, tap} from 'rxjs/operators';
import {fromEvent, of} from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { AuthService } from '../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

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
    artist: 'Anónimo',
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
      console.log("Elige canción!");
    } else {

      const publishDate = (new Date().toISOString());
      const userData = this.authService.getUserData();

      const postInfo = {

        userId: userData.uid,
        username: userData.displayName,
        track: this.trackData,
        publishDate: publishDate,
        content: this.postContent

      }

      const posts = collection(this.firestore, 'posts');
      return addDoc(posts, postInfo);

    }

  }

}
