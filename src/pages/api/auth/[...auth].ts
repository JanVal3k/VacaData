import Google from '@auth/core/providers/google'
import { defineConfig } from 'auth-astro'

// export const { get, post } = Auth({
//   providers: [
//     GoogleProvider({
//       clientId: import.meta.env.GOOGLE_CLIENT_ID,
//       clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
//     })
//   ]
// });
export default defineConfig({
	providers: [
		Google({
			clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
		}),
	],
})