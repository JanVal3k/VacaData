import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  isLoggedIn = false;

  constructor(private firebaseSevice: FirebaseService){}

  ngRegistrer(){
    this.firebaseSevice.loginWithGoogle();
  }

  ngAfterViewInit() {
    if (this.signUpButton && this.signInButton && this.container) {
      this.signUpButton.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.add('right-panel-active');
      });

      this.signInButton.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.remove('right-panel-active');
      });
    } else {
      console.error('Uno o más elementos no se encontraron en el DOM.');
    }
  }
}