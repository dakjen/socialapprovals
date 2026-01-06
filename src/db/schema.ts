import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'; // Import relations

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  email: varchar('email', { length: 256 }).unique(),
  passwordHash: text('password_hash'), // Made nullable to avoid data loss on push
  role: varchar('role', { length: 50 }).default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // Temporarily nullable
  platform: varchar('platform', { length: 256 }), // Temporarily nullable
  username: varchar('username', { length: 256 }), // Temporarily nullable
  profilePicUrl: text('profile_pic_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  profileId: integer('profile_id').references(() => profiles.id), // Temporarily nullable
  caption: text('caption').notNull(),
  postDate: timestamp('post_date').notNull(),
  imageUrls: text('image_urls').array().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  profile: one(profiles, {
    fields: [posts.profileId],
    references: [profiles.id],
  }),
}));

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(), // Client associated with a user
  name: varchar('name', { length: 256 }).notNull(),
  company: varchar('company', { length: 256 }).notNull(),
  industry: varchar('industry', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  // Potentially many profiles per client, or many posts per client if that's the model
}));
