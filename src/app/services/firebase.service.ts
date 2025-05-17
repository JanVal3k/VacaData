import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { firebaseConfig } from '../../environments/environment';
import { UsersService } from './users.service';
import { ExtendedUserCredential } from '../../types/firebase.types';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig.firebase);
  firestore = getFirestore(this.app);
  auth = getAuth(this.app);
  constructor(private usersService: UsersService) {
    console.log(`firebase inicializado con: ${this.app}`) 
  }

  // async verificarUsuarioExiste(email: string) {
  //   const auth = getAuth();    
  //   const emailTrimmed = email.trim().toLowerCase();
  //   console.log('Esto el emailTimificado en verificarUsuarioExiste: ',emailTrimmed)
  //   try {
  //     const methods = await fetchSignInMethodsForEmail(auth, emailTrimmed)
  //     console.log('Métodos de sign-in para el email:', methods);
  //     return methods.length > 0;
  //   } catch (error) {
  //     console.error('Error al verificar usuario:', error);
  //     throw error;
  //   }
  // }
  //-------------------------------------------------------
  //-------------------------------------------------------
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
  
  //-------------------------------------------------------
  loginWithEmailAndPass(email: string, pass: string, nombre:string){
    const auth = getAuth();
    const db = getFirestore();
  createUserWithEmailAndPassword(auth, email, pass)  
    .then((userCredential)=>{
      const user = userCredential.user;
      return setDoc(doc(db, 'users', user.uid),{
        name: nombre,
        email: user.email,
        creadoEn: new Date(),
        rol: "ganadero"
      })
    })
    .catch((error)=>{
      console.error('Error en el registro', error.message);
    })
  }
  //-------------------------------------------------------
  signInwithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
    .then((result)=>{
      const extenderResult = result as ExtendedUserCredential;
      const user = extenderResult.user;
      if(extenderResult._tokenResponse?.isNewUser){
        alert("Usuario no registrado.")
        return false;
      }else{
        return user;
      }
    }).catch((error)=>{
      console.error('Error al iniciar sesión con Google:', error);
    });
  }
  //-------------------------------------------------------
  signInWithEmailAndPass(email: string, password: string): Observable<any> {
    const auth = getAuth();
    const sigInEmail: string = email;
    const sigInPass: string = password;
    console.log('Así llegan los valores: ', sigInEmail, sigInPass);
    return from(
       signInWithEmailAndPassword(auth, sigInEmail, sigInPass)      
    ).pipe(
      catchError(error => {
        if (error.message === 'usuario_no_existe') {
          console.error('El usuario no existe en la base de datos');
        } else {
          console.error('Error en la autenticación:', error);
        }
        return throwError(() => error);
      })
    );
  }
  
  
  //-------------------------------------------------------
  getCurrentUser(){
    return this.auth.currentUser;
  }
  //-------------------------------------------------------
  signOut(){
    this.auth.signOut();
  }
}