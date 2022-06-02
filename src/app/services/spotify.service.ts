import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private customHeader!: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.refreshToken();
  }

  searchSong({q}: TrackModel) : Observable<any> {

    this.customHeader = new HttpHeaders({
      Authorization: `Bearer ${environment.spotify.token}`
    });

    return this.httpClient.get(`${environment.spotify.searchURL}?q=${q}&type=track&limit=5`, {headers: this.customHeader});

  }

  getSongData({q}: TrackModel) : Observable<any> {

    this.customHeader = new HttpHeaders({
      Authorization: `Bearer ${environment.spotify.token}`
    });

    return this.httpClient.get(`${environment.spotify.searchURL}?q=${q}&type=track&limit=1`, {headers: this.customHeader});

  }

  refreshToken() {

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let params = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.spotify.client)
      .set('client_secret', environment.spotify.secret);

    this.httpClient.post(environment.spotify.refreshURL, params, options)
      .subscribe((response:any) => {
        environment.spotify.token = response.access_token;
      });

  }


}

export class TrackModel {
  q: string | undefined;
}