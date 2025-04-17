import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../environments/environment';
import { TursoService } from './turso.service';
import { ExtendedUserCredential } from '../../types/firebase.types';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig.firebase);
  firestore = getFirestore(this.app);
  auth = getAuth(this.app);

  constructor(private tursoService: TursoService) {
    console.log(`fireBAse inicializado con: ${this.app}`) 
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        
        const extenderResult = result as ExtendedUserCredential;
        const user = extenderResult.user;

        console.log('Lo que trae el objeto usuario', user);

        if(extenderResult._tokenResponse.isNewUser){
          alert('¡Bienvenido! Tu cuenta ha sido creada.');
        this.tursoService.saveUser(user);
        }else{
        alert('¡Bienvenido de nuevo! Has iniciado sesión.');
        }

      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  signOut(){
    this.auth.signOut();
  }
}