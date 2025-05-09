import { Component, ElementRef, ViewChild, AfterViewInit, viewChild } from '@angular/core';
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
  @ViewChild('NameRegistro') NameRegistro!: ElementRef;
  @ViewChild('EmailRegistro') EmailRegistro!: ElementRef;
  @ViewChild('PassRegistro') PassRegistro!: ElementRef;

  isLoggedIn = false;

  

  constructor(private firebaseService: FirebaseService){}

  ngRegistrer(){
    this.firebaseService.loginWithGoogle();
  }
  RigistrerWithEmailNPass(){
    const dataUserRegister = {
      nombre: this.NameRegistro.nativeElement.value,
      email: this.EmailRegistro.nativeElement.value,
      pass: this.PassRegistro.nativeElement.value
    } 
    this.firebaseService.loginWithEmailAndPass(dataUserRegister.email, dataUserRegister.pass, dataUserRegister.nombre);
  }
  signIn(){
      this.firebaseService.signInwithGoogle();
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