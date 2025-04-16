import { Injectable } from '@angular/core';
import { createClient } from '@libsql/client';

const client = createClient({
  url: "libsql://db-vacadata-janval3k.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDM0NTI1NTcsImlkIjoiMzU5YzA0MzMtMzdiZi00ZjMxLWI4OTYtZTNhNTYzMDc5NTg4IiwicmlkIjoiZTgzY2UxYTgtZGU1NC00ZjEzLTk2MzQtZjAwMzE1Y2QxNWZlIn0.gTDxhZdlu9eaYITFvoY0y9Ywb09Zw0M1CbLAfcL33SV83euZxiI0HMb0F5agteHymmz1R3cOn4YBRMJKvAKdCg"
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
