import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { Auth } from 'firebase/auth';
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
    console.log(`firebase inicializado con: ${this.app}`) 
  }
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
  async verificarUsuarioExiste(email: string) {
  const auth = getAuth();
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0; // Devuelve true si el usuario existe
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    throw error;
  }
}
  async signInWithEmailAndPass(email: string, pass: string) {
  const auth = getAuth();
  console.log('Así llegan los valores: ', email, pass);
  
  // Primero verificamos si el usuario existe
  const usuarioExiste = await this.verificarUsuarioExiste(email);
  
  if (!usuarioExiste) {
    // Si el usuario no existe, lanzamos un error personalizado
    throw new Error('usuario_no_existe');
  }
  
  // Si el usuario existe, procedemos con el inicio de sesión
  return signInWithEmailAndPassword(auth, email, pass);
}
//  signInWithEmailAndPass(email: string, pass: string){
//   const auth = getAuth();
//   console.log('Asi llegan los valores: ', email , pass)
//   return signInWithEmailAndPassword(auth, email,pass);
  
  
// }

  //-------------------------------------------------------
  getCurrentUser(){
    return this.auth.currentUser;
  }
  //-------------------------------------------------------
  signOut(){
    this.auth.signOut();
  }
}