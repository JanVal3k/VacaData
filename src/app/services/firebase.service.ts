import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../environments/environment';
import { UsersService } from './users.service';
import { ExtendedUserCredential } from '../../types/firebase.types';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig.firebase);
  firestore = getFirestore(this.app);
  auth = getAuth(this.app);

  constructor(private usersService: UsersService) {
    console.log(`fireBAse inicializado con: ${this.app}`) 
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        
        const extenderResult = result as ExtendedUserCredential;
        const user = extenderResult.user;

        console.log('Lo que trae el objeto usuario', user);

        if (extenderResult._tokenResponse.isNewUser) {
          const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber || null
          }  
          this.usersService.saveUser(userData).subscribe({
            next: (response) => {
              console.log('Usuario guardado en Turso:', response);
            },
            error: (err) => {
              console.error('Error al guardar el usuario en Turso:', err);
            }
          });
        } else {
          console.log('¡Bienvenido de nuevo! Has iniciado sesión.');
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