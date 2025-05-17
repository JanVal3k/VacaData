import { Component, ElementRef, ViewChild, AfterViewInit, viewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('NameRegistro') NameRegistro!: ElementRef;
  @ViewChild('EmailRegistro') EmailRegistro!: ElementRef;
  @ViewChild('PassRegistro') PassRegistro!: ElementRef;
  @ViewChild('emailSignIn') emailSignIn!: ElementRef;
  @ViewChild('passSignIn') passSignIn!: ElementRef;
  isLoggedIn = false;
  errorMessage = '';
//---------------------
  constructor(private firebaseService: FirebaseService){}
//---------------------
  ngRegistrer(){
    this.firebaseService.loginWithGoogle();
  }
//---------------------
  RigistrerWithEmailNPass(){
    const dataUserRegister = {
      nombre: this.NameRegistro.nativeElement.value,
      email: this.EmailRegistro.nativeElement.value,
      pass: this.PassRegistro.nativeElement.value
    } 
    this.firebaseService.loginWithEmailAndPass(dataUserRegister.email, dataUserRegister.pass, dataUserRegister.nombre);
  }
//---------------------
  signInWithGoogleHTML(){
      this.firebaseService.signInwithGoogle();
  }
//---------------------
  signInWithEmailAndPassword() {
    const userData = {
      email: this.emailSignIn.nativeElement.value,
      pass: this.passSignIn.nativeElement.value,
    }
    console.log('Este es el valor de Email: ', userData.email)
    console.log('Este es el valor de Pass: ', userData.pass)
    
    
    this.firebaseService.signInWithEmailAndPass(userData.email, userData.pass)
      .subscribe({
        next: (response) => {
          console.log('Usuario ha iniciado sesión correctamente', response);
          this.isLoggedIn = true;
          this.errorMessage = '';
          
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.isLoggedIn = false;
          
          
          if (error.message === 'usuario_no_existe') {
            this.errorMessage = 'No existe una cuenta con este correo electrónico';
          } else if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'Contraseña incorrecta';
          } else if (error.code === 'auth/invalid-credential') {
            this.errorMessage = 'Credenciales inválidas';
          } else if (error.code === 'auth/too-many-requests') {
            this.errorMessage = 'Demasiados intentos fallidos. Intenta más tarde';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';
          }
        }
      });
  }
//--------------------- 
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