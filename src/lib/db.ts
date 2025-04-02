import {createClient } from '@libsql/client';

export const db = createClient({
    url: import.meta.env.TURSO_URL,
    authToken: import.meta.env.TURSO_AUTH_TOKEN
})