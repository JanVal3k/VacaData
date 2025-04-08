import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";


export const users = table('users', {
  id: t.text('id').primaryKey(),
  name: t.text('name'),
  email: t.text('email').notNull(),
  emailVerified: t.integer('email_verified', { mode: 'timestamp' }),
  image: t.text('image'),
});


export const accounts = table('accounts', {
  userId: t.text('user_id').notNull().references(() => users.id),
  type: t.text('type').notNull(),
  provider: t.text('provider').notNull(),
  providerAccountId: t.text('provider_account_id').notNull(),
  refresh_token: t.text('refresh_token'),
  access_token: t.text('access_token'),
  expires_at: t.integer('expires_at'),
  token_type: t.text('token_type'),
  scope: t.text('scope'),
  id_token: t.text('id_token'),
  session_state: t.text('session_state'),
}, (table) => [
  t.primaryKey({ columns: [table.provider, table.providerAccountId] })
]);


export const sessions = table('sessions', {
  sessionToken: t.text('session_token').primaryKey(),
  userId: t.text('user_id').notNull().references(() => users.id),
  expires: t.integer('expires', { mode: 'timestamp' }).notNull(),
});


export const verificationTokens = table('verification_tokens', {
  identifier: t.text('identifier').notNull(),
  token: t.text('token').notNull(),
  expires: t.integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => [
  t.primaryKey({ columns: [table.identifier, table.token] })
]);


export const usersTable = users;
export const accountsTable = accounts;
export const sessionsTable = sessions;
export const verificationTokensTable = verificationTokens;
