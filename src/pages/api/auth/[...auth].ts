import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '../../../lib/db/db';
import * as schema from '../../../lib/db/schema';

export default defineConfig({
	adapter: DrizzleAdapter(db,schema),
	providers: [
	  Google({
		clientId: import.meta.env.GOOGLE_CLIENT_ID,
		clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
	  })
	],
	secret: import.meta.env.AUTH_SECRET,
	trustHost: true
  });
  // export default defineConfig({
// 	providers: [
// 		Google({
// 			clientId: import.meta.env.GOOGLE_CLIENT_ID,
//       	clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
// 		}),
// 	],
// })