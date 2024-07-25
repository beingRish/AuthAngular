import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.user.subscribe(res => {
      this.isLoggedIn = !!res;
    })
  }

  toggleProfilePopup() {
    const profilePopup = document.querySelector('.profile-popup');
    if (profilePopup) {
      profilePopup.classList.toggle('active');
    }
    profilePopup?.classList.toggle('hidden');
  }

  onSignOut() {
    this._authService.signOut();
  }

}
