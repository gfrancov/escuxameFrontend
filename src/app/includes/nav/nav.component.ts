import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isCollapsed = true;
  public isLogged = false;

  constructor(private authService: AuthService, private router: Router, private afauth : AngularFireAuth, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if(!user) {
        this.ngZone.run(() => {
          this.isLogged = true;
        });
      }
    });

  }

  cerrarSesion() {
    this.authService.logout();
  }

}
