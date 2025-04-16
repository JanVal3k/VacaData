
export const firebaseConfig = {
  production: true,
   firebase: { 
    apiKey: import.meta.env.apiKey,
    authDomain: import.meta.env.authDomain, 
    projectId: import.meta.env.projectId,
    storageBucket: import.meta.env.storageBucket,
    messagingSenderId: import.meta.env.messagingSenderId,
    appId: import.meta.env.appId
    }
};
