import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  mobile: text('mobile'),
  companyName: text('company_name'),
  companyAddress: text('company_address'),
  role: roleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
