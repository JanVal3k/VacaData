import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../environments/environment';
import { TursoService } from './turso.service';

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
        const user = result.user;
        console.log('Usuario autenticado:', user);
        this.tursoService.saveUser(user);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }
}