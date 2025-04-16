import { Injectable } from '@angular/core';
import { createClient } from '@libsql/client';
import { firebaseConfig } from '../../environments/environment';


const client = createClient({
  url: firebaseConfig.turso.TURSO_URL,
  authToken: firebaseConfig.turso.TURSO_AUTH_TOKEN
});

@Injectable({
  providedIn: 'root'
})
export class TursoService {
  constructor() {}

  async saveUser(user: any) {
    try {
      await client.execute({
        sql: `
          INSERT OR REPLACE INTO users (id, displayName, email, photoURL, phoneNumber, last_login)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `,
        args: [
          user.uid,
          user.displayName,
          user.email,
          user.photoURL,
          user.phoneNumber
        ]
      });
      console.log('✅ Usuario guardado en Turso:', user.email);
    } catch (error) {
      console.error('❌ Error al guardar usuario en Turso:', error);
    }
  }
}
